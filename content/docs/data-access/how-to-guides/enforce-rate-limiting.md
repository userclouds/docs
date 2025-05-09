---
title: "Enforce rate limiting"
slug: "enforce-rate-limiting"
excerpt: ""
hidden: false
createdAt: "Thu Jun 27 2024 16:38:12 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 27 2024 17:39:27 GMT+0000 (Coordinated Universal Time)"
---
## Overview

Rate limiting allows you to control the frequency and volume of API calls by a given user to prevent abuse and reduce account takeover risk. UserClouds supports two main types of rate limits: execution limits and result limits. Rate limits are applied to accessors, mutators and token resolution using access policies.

Each <<glossary:accessor>>, <<glossary:mutator>> and <<glossary:token>> is associated with a single “top-level” <<glossary:access policy>> that controls the circumstances in which the accessor/mutator can be called or the token resolved. This access policy may be a composition of other sub-policies. Only the top-level access policy’s rate limits are considered. Rate limits on sub-policies are ignored during policy composition. If (and only if) no rate limits are specified on the top-level access policy for an accessor or mutator, the rate limits for the Global Baseline Policy will be applied.

If two resources (e.g. accessors) use the same rate limiting access policy, their usage is calculated separately. They do not share or combine their usage, so if each accessor stays within its limits, neither will be restricted, even if their combined usage exceeds the limit specified in the policy.

UserClouds applies rate limits to a given user based on the `sub` (subject) claim in a valid and trusted JWT (JSON Web Token) passed in context during accessor/mutator invocation or token resolution. This allows each user's data access to be tracked individually, ensuring that the rate limits specified in the access policy are enforced per user.

## AccessPolicyThresholds Configuration

The `AccessPolicyThresholds` structure defines the parameters for rate limiting:

```
type AccessPolicyThresholds = {  
  announce_max_execution_failure: boolean;  
  announce_max_result_failure: boolean;  
  max_executions: number;  
  max_execution_duration_seconds: number;  
  max_results_per_execution: number;  
};
```

## Execution Limits

Execution limits control how often an action can be performed within a specific time window. Execution rate limits can be turned off by setting `max_executions` to 0.

- `max_executions`: Maximum number of times an action can be executed within the specified duration. If this is 0, the limit is turned off.
- `max_execution_duration_seconds`: Time window (in seconds) for the `max_executions` limit. This must be between 5 and 60 seconds.

Execution limits execute specially when a paginated accessor is called. The initial call is treated as one execution. Paging forward or backward from that initial call is not counted as another execution.

### Behavior:

- If `announce_max_execution_failure` is true, a 429 (Too Many Requests) error is returned when the limit is exceeded for accessors and mutators. Failures for token resolution are always silent (i.e., the token is not resolved).
- If `announce_max_execution_failure` is false, the request does not fail, but no actions will occur. That is, no results are returned (for accessors), modifications are not applied (for mutators), or tokens are not resolved (for token resolution).

## Result Limits

Result limits control the number of results that can be returned or affected by a single action. Result rate limits can be turned off by setting `max_results_per_execution` to 0.

- `max_results_per_execution`: Maximum number of results affected by a single execution. If this is 0, the limit is turned off.

### Limit definition:

- For accessors, this limit applies to the total number of results that could be returned, across all pages (if paginated). For example, an accessor that could return 6 different pages of 100 records each would exceed a 500 result limit, even though each individual page size is within the limit.
- For mutators, it applies to the number of records modified.
- For token resolution, it applies to the number of tokens resolved.

### Behavior:

- If `announce_max_result_failure` is true, a 400 (Bad Request) error is returned when the limit is exceeded.
- If `announce_max_result_failure` is false, the request does not fail, but no actions will occur. That is, no results are returned (for accessors), no modifications are applied (for mutators), or no tokens are resolved (for token resolution).

## Applying Rate Limits

Rate limiting is enabled by associating an access policy with rate limits to a mutator, accessor, or token. For tokens, the access policy is specified at token creation time (e.g. via the token resolution policy on an accessor returning the token).

### Token Resolution Note:

Failures are always silent (no error code is returned), as token resolution requests may involve multiple access policies, some of which may have rate limits and some may not.

## Example Usage

To set rate limits for an access policy, configure the `AccessPolicyThresholds`:

```
const accessPolicy: AccessPolicy = {  
  thresholds: {  
    announce_max_execution_failure: true,  
    announce_max_result_failure: true,  
    max_executions: 10,  
    max_execution_duration_seconds: 30,  
    max_results_per_execution: 50,  
  },  
  // Other access policy settings  
};
```

The rate limit thresholds for an access policy may be changed after the access policy is created. 

Note that we only consider the thresholds for the top level access policy for the accessor / mutator / token resolution. Since an access policy can be composed of multiple access policies, a sub-policy may have usage thresholds. Those thresholds would be ignored.

## Conclusion

Rate limiting via access policies is a crucial feature to manage API usage effectively. By setting execution and result limits, you can protect against abuse and account takeover risks, while configurable failure announcements provide flexibility in handling limit breaches.
