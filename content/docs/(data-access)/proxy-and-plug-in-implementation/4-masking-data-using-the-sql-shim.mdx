---
title: "Masking data"
slug: "masking-data-using-the-sql-shim"
excerpt: ""
hidden: false
createdAt: "Thu Jun 13 2024 13:54:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Sep 19 2024 19:27:59 GMT+0000 (Coordinated Universal Time)"
---
Once you have re-pointed your application’s database queries or API calls to the UserClouds proxy, you can begin intercepting and masking data flowing into your application. Note that we do not offer data transformation for unstructured data (e.g., in NoSQL databases).

### Types of Masking:

- **Transformation**: This is an irreversible data masking technique. For example, transforming `steve@apple.com` to `s****@*****.com`.
- **Tokenization**: This is a reversible data masking technique. The data is transformed into a unique semi-random string (or token), which can later be exchanged for the raw data. The token is associated with an access policy at creation time, which governs the circumstances under which the token can be resolved or de-tokenized.

### Steps to Mask Outbound Data:

**For SQL queries:**

1. **Trigger the Query**: Trigger the query in the application if you haven’t already (e.g., by loading a table of data or a user profile).
2. **Select and Edit the Query**: In the UserClouds Console, go to Accessors (under Access Methods), select the query in your list of data accessors and click "Edit".
3. **Find the Column to Mask**: Scroll down to the columns section and locate the column you would like to mask, such as SSN or email.
4. **Apply a Transformer**: Use the dropdown to apply a new transformer and click "Save".
   - If you mask data using a transformer of type `TokenizeByValue` or `TokenizeByReference`, the data will be tokenized (i.e., reversibly masked).
   - In this case, you will need to select a token access policy, which will determine the circumstances under which the token can be resolved back into the raw data.

**For API responses:**

1. **Trigger the API Call**: Trigger the API call in the application if you haven’t already (e.g., by requesting a user profile or retrieving data from an endpoint).
2. **Select and Edit the API Connection**: In the UserClouds Console, go to API connections (under User Data Storage), select the API endpoint in your list of data accessors and click "Edit".
3. **Find the Endpoint**: Scroll down to the endpoints section and locate the endpoint for which you would like to mask outbound data.
4. **Apply a Transformer**: Use the dropdown to apply a new transformer and click "Save".
   - Unlike SQL queries, tokenization is not supported on API responses.

Now, UserClouds will intercept that query and mask the data in the specified column according to the data transformer. You can test this in your application UI to ensure it is working as expected.

For more details, see sections on [Transformers](https://docs.userclouds.com/docs/transformers-1), [Access Policies](https://docs.userclouds.com/docs/access-policies-1) and [Accessors](https://docs.userclouds.com/docs/accessors-read-apis).
