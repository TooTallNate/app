import faker from "faker";
import nock from "nock";
import { ODataClient, Guid } from "./client";

function getRouteConfig() {
  const hostname = `http://${faker.internet.domainName()}`;
  const servicePath = `/${faker.random.alphaNumeric(4)}`;
  const serviceRoot = `${hostname}${servicePath}`;
  return { hostname, servicePath, serviceRoot };
}

interface TestResource {
  boolProp: boolean;
  numProp: number;
  nestedProp: {
    numProp: number;
    stringProp: string;
  };
}

function getTestResource(): TestResource {
  return {
    boolProp: faker.random.boolean(),
    numProp: faker.random.number(),
    nestedProp: {
      numProp: faker.random.number(),
      stringProp: faker.random.alphaNumeric(10)
    }
  };
}

function getTestResources(
  count: number = faker.random.number({ min: 5, max: 20 })
): TestResource[] {
  return Array.from({ length: count }, getTestResource);
}

describe("get", () => {
  test("fetches a list of a resources", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(client.resource("test-resources").get()).resolves.toEqual(
      testResources
    );
  });

  test("fetches a list filtered by a not equals expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(boolProp ne false)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.notEquals("boolProp", false))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an equals expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(boolProp eq false)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.equals("boolProp", false))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an less than expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(numProp lt 5)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.lessThan("numProp", 5))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an less than or equal expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(numProp le 5)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.lessThanOrEqual("numProp", 5))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an greater than expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(numProp gt 5)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.greaterThan("numProp", 5))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an greater than or equal expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "(numProp ge 5)"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f => f.greaterThanOrEqual("numProp", 5))
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an and expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "((numProp gt 0) and (numProp lt 100))"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f =>
          f.and(f.greaterThan("numProp", 0), f.lessThan("numProp", 100))
        )
    ).resolves.toEqual(testResources);
  });

  test("fetches a list filtered by an or expression", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResources = getTestResources();
    nock(hostname)
      .get(`${servicePath}/test-resources`)
      .query({
        $filter: "((numProp gt 100) or (numProp lt 0))"
      })
      .reply(200, {
        value: testResources
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources")
        .get()
        .filter(f =>
          f.or(f.greaterThan("numProp", 100), f.lessThan("numProp", 0))
        )
    ).resolves.toEqual(testResources);
  });

  test("fetches a specific resource with a string ID", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = faker.random.alphaNumeric(8);
    nock(hostname)
      .get(`${servicePath}/test-resources(%27${id}%27)`)
      .reply(200, testResource);
    const client = new ODataClient({ serviceRoot });

    await expect(client.resource("test-resources", id).get()).resolves.toEqual(
      testResource
    );
  });

  test("fetches a specific resource with a numeric ID", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = faker.random.number();
    nock(hostname)
      .get(`${servicePath}/test-resources(${id})`)
      .reply(200, testResource);
    const client = new ODataClient({ serviceRoot });

    await expect(client.resource("test-resources", id).get()).resolves.toEqual(
      testResource
    );
  });

  test("fetches a specific resource with a guid ID", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = new Guid(faker.random.uuid());
    nock(hostname)
      .get(`${servicePath}/test-resources(${id})`)
      .reply(200, testResource);
    const client = new ODataClient({ serviceRoot });

    await expect(client.resource("test-resources", id).get()).resolves.toEqual(
      testResource
    );
  });

  test("fetches a subresource", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = new Guid(faker.random.uuid());
    nock(hostname)
      .get(`${servicePath}/test-resources(${id})/nestedProp`)
      .reply(200, testResource.nestedProp);
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources", id)
        .resource("nestedProp")
        .get()
    ).resolves.toEqual(testResource.nestedProp);
  });
});

describe("post", () => {
  test("posts to a resource collection", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    nock(hostname)
      .post(`${servicePath}/test-resources`, testResource as any)
      .reply(200, testResource);
    const client = new ODataClient({ serviceRoot });

    await expect(
      client.resource("test-resources").post(testResource)
    ).resolves.toEqual(testResource);
  });

  test("posts to a nested collection", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = new Guid(faker.random.uuid());
    nock(hostname)
      .post(
        `${servicePath}/test-resources(${id})/nestedProp`,
        testResource.nestedProp as any
      )
      .reply(200, testResource.nestedProp);
    const client = new ODataClient({ serviceRoot });

    await expect(
      client
        .resource("test-resources", id)
        .resource("nestedProp")
        .post(testResource.nestedProp)
    ).resolves.toEqual(testResource.nestedProp);
  });
});

describe("patch", () => {
  test("patches a resource", async () => {
    const { hostname, serviceRoot, servicePath } = getRouteConfig();
    const testResource = getTestResource();
    const id = new Guid(faker.random.uuid());
    const etag = faker.random.alphaNumeric(12);
    const doc: Partial<TestResource> = {
      numProp: faker.random.number()
    };
    nock(hostname)
      .get(`${servicePath}/test-resources(${id})`)
      .reply(200, {
        ...testResource,
        "@odata.etag": etag
      });
    nock(hostname)
      .patch(`${servicePath}/test-resources(${id})`, doc as any)
      .reply(200, {
        ...testResource,
        ...doc
      });
    const client = new ODataClient({ serviceRoot });

    await expect(
      client.resource("test-resources", id).patch(doc)
    ).resolves.toEqual({
      ...testResource,
      ...doc
    });
  });
});
