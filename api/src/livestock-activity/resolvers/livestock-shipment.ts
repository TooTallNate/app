import {
  MutationResolvers,
  QueryResolvers,
  LivestockShipmentResolvers,
  LivestockShipmentEventResolvers,
  DimensionPackerResolvers
} from "../../common/graphql";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../../common/nav";
import { getDocumentNumber } from "../../common/utils";
import LivestockShipmentModel from "../models/LivestockShipment";
import UserSettingsModel from "../../common/models/UserSettings";
import { postItemJournal } from "./livestock-activity";

export const LivestockShipment: LivestockShipmentResolvers = {
  job(livestockShipment, _, { dataSources }) {
    return dataSources.navJob.getJobLivestockByNo(livestockShipment.job);
  },
  event(livestockShipment, _, { dataSources }) {
    if (livestockShipment.event) {
      return dataSources.navItemJournal.getStandardJournalByCode({
        code: livestockShipment.event,
        template: NavItemJournalTemplate.Shipment
      });
    }
  }
};

export const DimensionPacker: DimensionPackerResolvers = {
  code: dp => dp.Code,
  dimensionCode: dp => dp.DimensionCode,
  dimensionName: dp => dp.DimensionName
};

export const LivestockShipmentQueries: QueryResolvers = {
  async livestockShipment(_, { job }) {
    return (
      (await LivestockShipmentModel.findOne({ job })) ||
      new LivestockShipmentModel({ job })
    );
  },
  async livestockShipmentEventTypes(_, __, { dataSources }) {
    return await dataSources.navItemJournal.getStandardJournals(
      NavItemJournalTemplate.Shipment
    );
  },
  async dimensionPackers(_, __, { dataSources }) {
    const x = await dataSources.navMisc.getAllDimensionPackers();
    return x;
  }
};

export const LivestockShipmentEvent: LivestockShipmentEventResolvers = {
  code: journal => journal.Code,
  description: journal => journal.Description
};

export const LivestockShipmentMutations: MutationResolvers = {
  async saveLivestockShipment(_, { input }, { user, navConfig }) {
    const doc =
      (await LivestockShipmentModel.findOne({
        job: input.job
      })) || new LivestockShipmentModel();
    doc.set(input);
    await doc.save();

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    return {
      success: true,
      livestockShipment: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  },
  async postLivestockShipment(_, { input }, { user, dataSources, navConfig }) {
    const [
      standardJournal
    ] = await dataSources.navItemJournal.getStandardJournalLines({
      code: input.event,
      template: NavItemJournalTemplate.Shipment
    });

    if (!standardJournal) {
      throw Error(`Event ${input.event} not found.`);
    }

    const job = await dataSources.navJob.getJobLivestockByNo(input.job);
    await postItemJournal(
      {
        ...standardJournal,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("SHIPMENT", user.name),
        Description: input.comments,
        ShortcutDimCode_x005B_5_x005D_: input.dimensionPacker,
        Location_Code: standardJournal.Location_Code
          ? standardJournal.Location_Code
          : job.Site,
        Quantity: input.quantity,
        Weight: input.totalWeight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Meta: input.deadsOnArrivalQuantity
      },
      dataSources.navItemJournal
    );

    const userSettings = await UserSettingsModel.findOne({
      username: user.username,
      subdomain: navConfig.subdomain
    });

    const doc =
      (await LivestockShipmentModel.findOne({
        job: input.job
      })) || new LivestockShipmentModel();
    doc.overwrite({
      activity: doc.activity,
      job: input.job
    });
    await doc.save();

    return {
      success: true,
      livestockShipment: doc,
      defaults: userSettings || new UserSettingsModel()
    };
  }
};
