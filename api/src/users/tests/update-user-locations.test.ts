import nock from "nock";
import { client, mockUser, testUnauthenticated } from "../../../test/utils";
import {
  MutationUpdateUserLocationsArgs,
  UpdateUserLocationsResult,
  InclusivityMode
} from "../../common/graphql";
import { LocationFactory, UserSettingsFactory } from "../../../test/builders";
import UserSettingsModel from "../../common/models/UserSettings";
import { NavLocation } from "../../common/nav";

function mutation(variables: MutationUpdateUserLocationsArgs) {
  return client.request<UpdateUserLocationsResult>(
    `mutation UpdateLocations($input: UpdateUserLocationsInput!) {
      updateUserLocations(input: $input) {
        success
        locations {
          mode
          list {
            code
            name
          }
        }
      }
    }`,
    variables
  );
}

function mockNavLocations(
  locations: NavLocation[],
  auth: { user: string; pass: string }
): void {
  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Locations`)
    .query({
      $filter: `(${locations
        .map(location => `(Code eq '${location.Code}')`)
        .join(" or ")})`
    })
    .basicAuth(auth)
    .reply(200, locations);
}

testUnauthenticated(() => mutation({ input: {} }));

test("adds location to the list", async () => {
  const { user, auth } = await mockUser();
  const settings = await UserSettingsModel.create(
    UserSettingsFactory.build({ username: user.User_Name })
  );
  const oldLocations = settings.locations.list.map(code =>
    LocationFactory.build({ Code: code })
  );
  const newLocations = LocationFactory.buildList(3);
  const locations = [...oldLocations, ...newLocations];

  mockNavLocations(locations, auth);

  expect(
    await mutation({
      input: {
        add: newLocations.map(loc => loc.Code)
      }
    })
  ).toEqual({
    updateUserLocations: {
      success: true,
      locations: {
        mode: settings.locations.mode,
        list: locations.map(loc => ({
          code: loc.Code,
          name: loc.Name
        }))
      }
    }
  });

  const updatedSettings = await UserSettingsModel.findById(settings._id).lean();
  expect(updatedSettings).toMatchObject({
    locations: {
      mode: settings.locations.mode,
      list: locations.map(loc => loc.Code)
    }
  });
});

test("removes location from the list", async () => {
  const { user, auth } = await mockUser();
  const removeLocations = LocationFactory.buildList(2);
  const locations = LocationFactory.buildList(4);
  const oldLocations = [...removeLocations, ...locations];
  const settings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      locations: {
        mode: InclusivityMode.Include,
        list: oldLocations.map(loc => loc.Code)
      }
    })
  );

  mockNavLocations(locations, auth);

  expect(
    await mutation({
      input: {
        remove: removeLocations.map(loc => loc.Code)
      }
    })
  ).toEqual({
    updateUserLocations: {
      success: true,
      locations: {
        mode: settings.locations.mode,
        list: locations.map(loc => ({
          code: loc.Code,
          name: loc.Name
        }))
      }
    }
  });

  const updatedSettings = await UserSettingsModel.findById(settings._id).lean();
  expect(updatedSettings).toMatchObject({
    locations: {
      mode: settings.locations.mode,
      list: locations.map(loc => loc.Code)
    }
  });
});

test("changes list type", async () => {
  const { user, auth } = await mockUser();
  const locations = LocationFactory.buildList(4);
  const settings = await UserSettingsModel.create(
    UserSettingsFactory.build({
      username: user.User_Name,
      locations: {
        mode: InclusivityMode.Include,
        list: locations.map(loc => loc.Code)
      }
    })
  );

  mockNavLocations(locations, auth);

  expect(
    await mutation({
      input: {
        mode: InclusivityMode.Exclude
      }
    })
  ).toEqual({
    updateUserLocations: {
      success: true,
      locations: {
        mode: InclusivityMode.Exclude,
        list: locations.map(loc => ({
          code: loc.Code,
          name: loc.Name
        }))
      }
    }
  });

  const updatedSettings = await UserSettingsModel.findById(settings._id).lean();
  expect(updatedSettings).toMatchObject({
    locations: {
      mode: InclusivityMode.Exclude,
      list: locations.map(loc => loc.Code)
    }
  });
});

test("creates new settings document if one does not exist", async () => {
  const { user, auth } = await mockUser();
  const locations = LocationFactory.buildList(4);

  mockNavLocations(locations, auth);

  expect(
    await mutation({
      input: {
        add: locations.map(loc => loc.Code)
      }
    })
  ).toEqual({
    updateUserLocations: {
      success: true,
      locations: {
        mode: InclusivityMode.Include,
        list: locations.map(loc => ({
          code: loc.Code,
          name: loc.Name
        }))
      }
    }
  });

  const updatedSettings = await UserSettingsModel.findOne({
    username: user.User_Name
  }).lean();
  expect(updatedSettings).toMatchObject({
    locations: {
      list: locations.map(loc => loc.Code)
    }
  });
});
