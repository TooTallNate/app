import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import Button from "../../common/components/input/Button";
import DateInput from "../../common/components/input/DateInput";
import DecimalInput from "../../common/components/input/DecimalInput";
import StaticValue from "../../common/components/input/StaticValue";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import Divider from "../../common/components/layout/Divider";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import CommentsField from "../../livestock-activity/components/CommentsField";
import {
  Item,
  useInventoryItemQuery,
  useInventorySelectQuery,
  usePostInventoryMutation
} from "../graphql";

interface ViewParams {
  location: string;
  group: string;
}

interface ItemListProps {
  item: ItemProps;
  quantity: number;
}

interface ItemProps {
  number: string;
  description: string;
  type: string;
  cost: number;
}

interface FormData {
  group: string;
  location: string;
  postingDate?: string;
  item: ItemProps;
  itemList: number;
  quantity: number;
  finalAmount: number;
  comments?: string;
}

const InventoryView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>({ reValidateMode: "onSubmit" });

  const [list, setList] = useState<ItemListProps[]>();
  const [total, setTotal] = useState<Number>(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { setMessage } = useFlash();
  const { watch, reset } = formContext;

  const match = useRouteMatch();

  const {
    loading: jobAndLocationLoading,
    data: jobAndLocationData
  } = useInventorySelectQuery({
    onCompleted({ livestockActivityDefaults: defaults }) {
      if (defaults.job) {
        formContext.setValue("group", defaults.job.number);
      }
      if (defaults.location) {
        formContext.setValue("location", defaults.location.code);
      }
    }
  });

  const {
    loading: inventoryLoading,
    data: inventoryData
  } = useInventoryItemQuery();

  const [post] = usePostInventoryMutation();

  const onSubmit: OnSubmit<FormData> = async ({
    postingDate,
    comments,
    location,
    group
  }) => {
    if (!list || list.length < 1) {
      setMessage({
        message: "Item needs to be added to list",
        level: "error",
        timeout: 2000
      });
    } else {
      try {
        await post({
          variables: {
            input: {
              location: location,
              group: group,
              postingDate: postingDate,
              itemList: list,
              comments: comments
            }
          }
        });
        setList(undefined);
        formContext.reset({
          group,
          location,
          comments: ""
        });
        setMessage({
          message: "Entry recorded successfully.",
          level: "success",
          timeout: 2000
        });
        history.push(`${match.url}`);
      } catch (e) {
        const error: any = e;
        setMessage({
          message: error.toString(),
          level: "error",
          timeout: 3000
        });
      }
    }
  };
  let quantity = watch("quantity");
  let item = watch("item") || undefined;

  const removeItem = (item: ItemProps) => {
    if (list) {
      const newList = list.filter(i => i.item.number !== item.number);
      setList(newList);
    }
  };

  const addItem = () => {
    const newItem: ItemListProps = {
      item: {
        number: item.number,
        description: item.description,
        type: item.type,
        cost: item.cost
      },
      quantity: quantity
    };
    if (list) {
      setList([...list, newItem]);
    } else {
      setList([newItem]);
    }
    reset({
      item: {
        number: "",
        description: "",
        type: "N/A",
        cost: 0
      },
      quantity: NaN
    });
  };

  useEffect(() => {
    if (list && list.length > 0) {
      const newTotal = list
        .map(item => item.item.cost * item.quantity)
        .reduce((prev, next) => prev + next);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [list]);

  useEffect(() => {
    if (item && quantity) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [item, quantity]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Inventory</ViewTitle>
      </ViewHeader>
      <ViewContent loading={jobAndLocationLoading && inventoryLoading}>
        {inventoryData && jobAndLocationData && (
          <>
            <Form context={formContext} onSubmit={onSubmit}>
              <FormField
                name="group"
                rules={{
                  required: "An item is required"
                }}
              >
                <FormFieldLabel>Group</FormFieldLabel>
                <FormFieldInput>
                  <TypeaheadInput
                    value={params.group || ""}
                    items={jobAndLocationData.jobs.map(job => ({
                      value: job.number || "",
                      title: `${job.number} - ${job.description}` || ""
                    }))}
                  />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>

              <FormField
                name="location"
                rules={{
                  required: "A location is required"
                }}
              >
                <FormFieldLabel>Source Location</FormFieldLabel>
                <FormFieldInput>
                  <TypeaheadInput
                    value={params.location || ""}
                    items={jobAndLocationData.locations.map(loc => ({
                      value: loc.code || "",
                      title: `${loc.name}` || ""
                    }))}
                  />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>

              <FormField name="postingDate">
                <FormFieldLabel>Activity Date</FormFieldLabel>
                <FormFieldInput>
                  <DateInput />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <FormField
                name="item"
                rules={{
                  required: "Item is required."
                }}
              >
                <FormFieldLabel>Select Item:</FormFieldLabel>
                <FormFieldInput>
                  <TypeaheadInput
                    items={inventoryData.items.map(item => ({
                      value: item || "",
                      title: `${item.number} - ${item.description}` || ""
                    }))}
                  />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <FormField name="type">
                <FormFieldLabel className=".text-lg">
                  Type: {item ? item.type : "N/A"}
                </FormFieldLabel>
                <FormFieldErrors />
              </FormField>
              <FormField
                name="quantity"
                rules={{
                  required: "Quantity is required."
                }}
              >
                <FormFieldLabel>Quantity</FormFieldLabel>
                <FormFieldInput>
                  <DecimalInput decimalPlaces={2} step=".01" className="w-32" />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <FormField name="recentCost">
                <FormFieldLabel>
                  Recent Cost: ${item ? item.cost.toFixed(2) : "0"}
                </FormFieldLabel>
                <FormFieldErrors />
              </FormField>
              <Button
                id="add"
                className="mr-4 w-32"
                disabled={buttonDisabled}
                onClick={() => {
                  addItem();
                }}
              >
                Add
              </Button>
              {list && (
                <div className="overflow-x-auto pb-3">
                  <table className="divide-y divide-gray-200 box-shadow min-w-full">
                    <thead>
                      <tr>
                        <TableHeader children="Item" />
                        <TableHeader children="Quantity" />
                        <TableHeader children="Total Cost" />
                        <TableHeader children="Remove" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item: ItemListProps, index: number) => (
                        <tr key={index}>
                          <TableData children={item.item.description} />
                          <TableData children={item.quantity} />
                          <TableData
                            children={`$${(
                              item.item.cost * item.quantity
                            ).toFixed(2)}`}
                          />
                          <TableData>
                            <button
                              type="button"
                              className="px-4 focus:outline-none"
                              aria-label="Clear Selection"
                              tabIndex={-1}
                              onClick={() => removeItem(item.item)}
                            >
                              <FontAwesomeIcon icon="times" />
                            </button>
                          </TableData>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <FormField name="finalAmount">
                <FormFieldLabel>
                  Total: ${list ? total.toFixed(2) : "0"}
                </FormFieldLabel>
                <FormFieldInput>
                  <StaticValue className="hidden" value={total.toFixed(2)} />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <CommentsField />
              <HorizontalSpacer />
              <FormSubmit />
            </Form>
          </>
        )}
      </ViewContent>
    </View>
  );
};

export default InventoryView;
