import { Machine, assign } from "xstate";

interface TypeaheadStateSchema {
  states: {
    inactive: {};
    active: {
      states: {
        matching: {};
        notMatching: {};
        cancelled: {};
        selected: {};
        checkMatch: {};
      };
    };
  };
}

export type TypeaheadEvent =
  | { type: "OVERRIDE"; value: any; items: TypeaheadItem[] }
  | { type: "FOCUS" }
  | { type: "BLUR" }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "CANCEL" }
  | { type: "TYPE"; value?: string }
  | { type: "SELECT"; index?: number };

export interface TypeaheadItem {
  title: string;
  value: any;
}

export interface TypeaheadContext {
  value?: TypeaheadItem;
  textValue: string;
  items: TypeaheadItem[];
  matchedItems: TypeaheadItem[];
  selectedIndex: number;
}

export default Machine<TypeaheadContext, TypeaheadStateSchema, TypeaheadEvent>(
  {
    id: "typeahead",
    initial: "inactive",
    context: {
      textValue: "",
      items: [],
      matchedItems: [],
      selectedIndex: 0
    },
    states: {
      inactive: {
        on: {
          FOCUS: "active",
          OVERRIDE: {
            actions: "override"
          }
        }
      },
      active: {
        initial: "checkMatch",
        on: {
          BLUR: "inactive",
          OVERRIDE: {
            actions: "override"
          }
        },
        states: {
          matching: {
            on: {
              TYPE: {
                target: "checkMatch",
                actions: "type"
              },
              NEXT: {
                target: "matching",
                actions: "next"
              },
              PREV: {
                target: "matching",
                actions: "prev"
              },
              SELECT: {
                target: "selected",
                actions: "select"
              },
              CANCEL: {
                target: "cancelled",
                actions: "cancel"
              }
            }
          },
          notMatching: {
            on: {
              TYPE: {
                target: "checkMatch",
                actions: "type"
              },
              CANCEL: {
                target: "cancelled",
                actions: "cancel"
              }
            }
          },
          cancelled: {
            on: {
              TYPE: {
                target: "checkMatch",
                actions: "type"
              }
            }
          },
          selected: {
            on: {
              TYPE: {
                target: "checkMatch",
                actions: "type"
              }
            }
          },
          checkMatch: {
            on: {
              "": [
                {
                  target: "matching",
                  cond: "hasMatches"
                },
                {
                  target: "notMatching",
                  cond: "hasNoMatches"
                }
              ]
            }
          }
        }
      }
    }
  },
  {
    guards: {
      hasMatches: context => context.matchedItems.length > 0,
      hasNoMatches: context => context.matchedItems.length === 0
    },
    actions: {
      type: assign((context, event) => {
        const value =
          event.type === "TYPE" ? event.value || "" : context.textValue;
        const matcher = new RegExp(value, "i");
        return {
          ...context,
          textValue: value,
          matchedItems: context.items.filter(item => matcher.test(item.title)),
          selectedIndex: 0
        };
      }),
      next: assign(context => {
        return {
          ...context,
          selectedIndex:
            (context.selectedIndex + 1) % context.matchedItems.length
        };
      }),
      prev: assign(context => {
        const prev = context.selectedIndex - 1;
        return {
          ...context,
          selectedIndex: prev < 0 ? context.matchedItems.length - 1 : prev
        };
      }),
      select: assign((context, event) => {
        const index =
          event.type === "SELECT" && typeof event.index === "number"
            ? event.index
            : context.selectedIndex;
        const item = context.matchedItems[index];
        if (item) {
          const matcher = new RegExp(item.title, "i");
          return {
            ...context,
            value: item,
            textValue: item.title,
            matchedItems: context.items.filter(item =>
              matcher.test(item.title)
            ),
            selectedIndex: 0
          };
        } else {
          return context;
        }
      }),
      override: assign((context, event) => {
        if (event.type === "OVERRIDE") {
          const item = event.items.find(item => item.value === event.value);
          if (item) {
            const matcher = new RegExp(item.title, "i");
            return {
              items: event.items,
              value: item,
              textValue: item.title,
              matchedItems: context.items.filter(item =>
                matcher.test(item.title)
              ),
              selectedIndex: 0
            };
          } else {
            return {
              ...context,
              items: event.items,
              value: undefined,
              matchedItems: event.items,
              selectedIndex: 0
            };
          }
        } else {
          return context;
        }
      }),
      cancel: assign(context => {
        if (context.value) {
          const matcher = new RegExp(context.value.title, "i");
          return {
            ...context,
            textValue: context.value.title,
            matchedItems: context.items.filter(item =>
              matcher.test(item.title)
            ),
            selectedIndex: 0
          };
        } else {
          return {
            ...context,
            textValue: "",
            matchedItems: context.items,
            selectedIndex: 0
          };
        }
      })
    }
  }
);
