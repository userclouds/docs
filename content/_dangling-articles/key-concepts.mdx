---
title: "Key Concepts"
slug: "key-concepts"
excerpt: ""
hidden: true
createdAt: "Fri Apr 05 2024 21:34:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 18:33:44 GMT+0000 (Coordinated Universal Time)"
---
UserClouds’s is a safety layer for data protection. The layer mediates access to sensitive data, enforcing best practices in security, privacy and governance. It can be deployed in several distinct areas of your stack, depending on your use case.

The Safety Layer allows you to define custom access paths, called **accessors** (for reading data) and **mutators** (for writing data) - see below for more detail. **Access policies** (like `IsRoleEngineer` and `IsIPTrusted`) describe a set of rules around reading and writing data. Policies control the circumstances in which data can be retrieved from and written to the store. **Data transformers** (like `BirthdayToAge` or `PhoneToAreaCode`) obscure, minimize or tokenize outbound data for a given use case.

# Reading Data

Data can be retrieved from the store using **accessors** (custom read paths that you define). Accessors are intended to be use-case specific, e.g.`GetEmailForMarketing` or `GetNameAndPhoneForSupport`. They enforce data usage policies and minimize outbound data from the store for their given use case. Each accessor is associated with a **user record selector**, a set of **columns**, a set of **data transformers**, a **purpose**, an **access policy** and an **optional token resolution policy** (see below). The user record selector is a SQL-like clause that specifies which records the accessor should return data for, based on an array of values that are passed at execution time. The columns indicate which data fields the accessor will pull. Each column is associated with a transformer, which transforms, minimizes or obscures the outbound data from that column. The purpose indicates what the accessor will be used for, e.g. marketing. The accessor will filter out user records where the user has not consented to the specified purpose. The access policy determines the circumstances in which the data can be retrieved. 

# Writing Data

New data can be written to the store using **mutators** (custom write paths that you define). Examples of mutators are `SetProfile` and `SetEmailAndPhoneNumber`. Each mutator is associated with a **user record selector**, a set of **columns**, a set of **validators** and an **access policy**. The record selector is a SQL-like clause that specifies which records the mutator should edit data for, based on an array of values that are passed at execution time. The columns indicate which data fields the mutator will edit. Each column is associated with a validator, which is a special data transformer that validates the incoming data and may transform it before saving it to the columns in the store. The access policy determines the circumstances in which the write is allowed. 

# Tokenizing Data

When using an accessor to retrieve data from the store, it is possible to **tokenize** the data. When you tokenize a piece of sensitive data, you replace it with a secure (but resolvable) reference token. Tokenization differs from other forms of data transformation: it allows an employee or service with sufficient permissions to **resolve** the token back into the raw data.

The token is generated from the accessor's **transformer** code. It is common to generate tokens randomly and/or to match the format of the raw data so that the token can be used in place of the data without causing validation errors. For example, you might transform an email address like `john@beatles.com` to `550e8400e@a59d15b1.com`. The token is associated with a separate **token resolution policy** which controls the circumstances in which the token can be exchanged for the original raw data. When an application or employee needs the original data, it can request to exchange the raw data from the tokenization service. If the resolution access policy is met, the raw data is returned. Once the purpose for which the data was retrieved is achieved, the raw data should be discarded.
