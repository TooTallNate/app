import {
  useDefaultsQuery,
  useUpdateDefaultsMutation,
  DefaultsInput,
  Defaults,
  DefaultsDocument,
  DefaultsQuery
} from "../graphql";

export type UseDefaultsResult = [
  Defaults,
  (input: DefaultsInput) => Promise<void>
];

export default function useDefaults(): UseDefaultsResult {
  const { data: { defaults = {} } = {} } = useDefaultsQuery();
  const [_update] = useUpdateDefaultsMutation({
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<DefaultsQuery>({
          query: DefaultsDocument,
          data: {
            defaults: data.updateDefaults
          }
        });
      }
    }
  });

  async function update(input: DefaultsInput) {
    await _update({ variables: { input } });
  }

  return [defaults, update];
}
