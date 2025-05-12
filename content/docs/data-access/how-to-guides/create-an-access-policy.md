---
title: "Create an access policy"
slug: "create-an-access-policy"
excerpt: ""
hidden: false
createdAt: "Thu Aug 03 2023 19:55:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jun 05 2024 17:52:00 GMT+0000 (Coordinated Universal Time)"
---
## Introduction

Access policies control the circumstances in which data can be retrieved or edited. Practically, access policies are functions that receive contextual data and return true or false according to whether access is allowed or denied.

Policy templates are parametrizable functions that, once parametrized, become access policies. For example, you may have a template `IsRole(role)` that accepts a parameter, role, to create policies like `IsRoleEngineer`, `IsRoleAdmin` and `IsRoleMember`.

New access policies can be created by writing a new policy or template from scratch, composing existing policies with `AND` / `OR` logic, or both. 

Access policies and templates are managed under the Access Rules element in the UserClouds Console sidebar.

![Policies and templates can be managed from the Policies page, accessible from the sidebar of UserClouds Console.](https://files.readme.io/184bfbc-image_4.png)


## Creating Policy Templates in the UI

Policy templates are parametrizable functions that can be parametrized to create access policies. To create a policy template, go to the Policies page and click Create Policy Template. 

**1 Create your <<glossary:access policy template>>**

Specify a name, a description and a javascript function for your policy. The javascript function may optionally accept parameters, which you can test below. 

![The Create Policy Template page.](https://files.readme.io/085e410-image_5.png)


**2 Test and save your policy template**

Use the "Test Your Draft" card at the bottom of the page to test your policy template. You can add test parameters to simulate turning the policy template into an access policy, and then test that access policy with test context. The interface will show the result of your test as "Access Allowed" or "Access Denied".

![The "Test Your Draft" card allows you to parametrize your draft template (creating an access policy) and then test that access policy with test context.](https://files.readme.io/ef73d2e-spaces_66DzLwptb2SejhKV7Bhn_uploads_oGa62N4DTjIR8mFABEN5_image.webp)


## Creating Access Policies in the UI

**1 Open the Create Access Policy Page**

To create a new access policy, click "Create Policy" from the Policies page, accessible from the sidebar of UserClouds Console. You can create the new policy by writing a new policy or template from scratch in this interface, by composing existing policies with AND / OR logic, or both. 

**2 Set your <<glossary:access policy>> name and description**

Next, add a name and a description for your policy.

![The Create Access Policy page in UserClouds Console.](https://files.readme.io/e0bf498-image_6.png)


**3 Compose your policy**

![The Compose Policy Card](https://files.readme.io/1249f6f-image_7.png)


Next, compose the policy from one or more policies and templates in the "Compose Policy" card.

Use the dropdowns and "Add policy" button to add policies or templates to add policies to your composition. When you add a template, set the parameters in the adjacent text input to turn the template into a policy. When you add a policy, the "Parameters" input will be disabled, since policy instances are already parametrized

If you want to add a brand new policy, you can click "Create New Policy Template" and write a new template from scratch, then parametrize it.

Once you have added two policies, choose a logical conjunction (`AND` or `OR`) for your composition.

To simulate groups / parentheses, create policies for each group, then conjugate them in a separate policy. This approach allows you to

**4 Test and save your new policy**

Finally, test your policy with different contexts in the "Test Your Draft" card. The interface will show the result of your test as "Access Allowed" or "Access Denied".

Nice job! You created an access policy.

<br />

# Additional Context and Examples

## Check Attribute (Regular Policy Example)

The checkAttribute function runs a permission check against the UserClouds authorization graph. If you are using UserClouds for authorization as a service, this can verify if a user has the necessary permissions. You can read more about this in the Authorization Documentation.

### Example

**Use Case: Does the calling user have view permission on the target user?**

```
function policy(context) {  
    const callingUserId = context.user.id;  
    const targetUserId = context.params.targetUserId;  
    const attribute = "viewPermission";  
    if (!callingUserId || !targetUserId || !attribute) {  
        return false;  
    }  
    return checkAttribute(callingUserId, targetUserId, attribute);  
}
```

<br />

## Parametrizable Access Policy Templates

Parametrizable templates let you create flexible policies by adjusting parameters.

### Example: User is N Years Old

```
function getAge(DOB) {  
    const today = new Date();  
    const birthDate = new Date(DOB);  
    let age = today.getFullYear() - birthDate.getFullYear();  
    const m = today.getMonth() - birthDate.getMonth();  
    if (m \< 0 || (m === 0 && today.getDate() \< birthDate.getDate())) {  
        age--;  
    }  
    return age;  
}

function policy(context, params) {  
  return getAge(context.user[params.column_name]) >= params.expected_years_old;  
}
```
