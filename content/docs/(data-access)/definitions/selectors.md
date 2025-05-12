---
title: "Selectors"
slug: "selectors"
excerpt: ""
hidden: false
createdAt: "Thu Aug 03 2023 19:28:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Mar 01 2024 17:20:02 GMT+0000 (Coordinated Universal Time)"
---
# Introduction

Selectors are SQL-like clauses that specify which records an <<glossary:accessor>> or <<glossary:mutator>> should act on. Each accessor/mutator is associated with exactly one selector. The selector is specified at accessor/mutator creation time, either as a free text input in the UI, or as a string through the API.

A Selector may refer to configured Columns, specified as `{ColumnName}`, where ColumnName is the defined name of the Column. Note that non-<<glossary:system column>>s used in selectors are subject to <<glossary:purpose check>>s: each accessor's response will filter out users who have not consented to the accessor's purpose for all columns being retrieved, and all non-system columns used in the selector.

A Selector may also specify a collection of variables, each of which is represented by a `?`, allowing the Selector to be parameterized for each individual accessor or mutator invocation. The `SelectorValues` array that is specified when executing an Accessor or Mutator is used to parameterize the associated Selector. Each of the values in <<glossary:SelectorValues>> must be a concrete value (i.e., contain no variables), and the number of values in SelectorValues must exactly match the number of variables in the Selector. The variables in a Selector are replaced sequentially by the values in SelectorValues at invocation time - the first value in SelectorValues replaces the first variable in the Selector, and so on. The type of each value must match the expected type of the value placeholder.

Examples of selectors include:

- `{FirstName} LIKE ?`
- `{Address}->>’country’ = ‘USA’`
- `{BoolColumn} = TRUE OR {IntColumn} = ?`

See below for a longer list of examples.

# Syntax

There is a special Selector clause, ALL, that directs the selector to retrieve all users, and should be used judiciously. Otherwise, a selector clause may take one of the following three forms:

- `TERM` - e.g. `{FirstName} LIKE ‘Alice’`
- `TERM CONJUNCTION CLAUSE`  - e.g. `{FirstName} LIKE ‘Alice’ OR {FirstName} LIKE ‘Bob’`
- `( TERM )` - e.g.`( {FirstName} LIKE ‘Alice’ OR {FirstName} LIKE ‘Bob’ ) AND {FirstName} != ‘Bill'`

The second form of a selector clause means that you can chain together an unlimited number of TERMs with CONJUNCTIONs (i.e., TERM CONJUNCTION TERM CONJUNCTION … TERM). 

A TERM may be any of the following:

- COLUMN OPERATOR VALUE - e.g. `{FirstName} LIKE ‘Alice’`
- COLUMN NULL_CHECK - e.g. `{Address} IS NOT NULL`

A COLUMN may be any of the following:

- COLUMN_IDENTIFIER - e.g. `{Address}`
- NO_ARG_COLUMN_OPERATOR ( COLUMN ) - e.g. `char_length({FirstName})`
- LEFT_ARG_COLUMN_OPERATOR ( VALUE , COLUMN ) - e.g. `date_part( ‘day’, {DateColumn} )`
- RIGHT_ARG_COLUMN_OPERATOR ( COLUMN , VALUE ) - e.g. `mod( {IntColumn}, 4 )`

A VALUE may be any of the following:

- VALUE_PLACEHOLDER
- BOOL_VALUE
- INT_VALUE
- QUOTED_VALUE
- ANY ARRAY_VALUE

ARRAY_VALUE must be any of the following:

- VALUE_PLACEHOLDER
- ARRAY [ ARRAY_ELEMENTS ]
- ( ARRAY_VALUE )

ARRAY_ELEMENTS must either be a VALUE or a comma-separated list of VALUEs. Each VALUE in the list must either be a VALUE_PLACEHOLDER or be of the same data type as the COLUMN. The following are examples of valid and invalid usages of ARRAY_ELEMENTS:

- `{IntColumn} = ANY ARRAY [ ?, ?, 10 ]` - this is valid, since all array elements are either a VALUE_PLACEHOLDER, or an integer value, same as the column type.
- `{StringColumn} = ANY ARRAY [ ?, ‘foo’, ‘bar’ ]` - this is valid, since all array elements are either a VALUE_PLACEHOLDER, or a string value, same as the column type.
- `{IntColumn} = ANY ARRAY [ 10, ‘foo’ ]` - this is invalid, since we are expecting all array elements to be integers, and the second entry is a string.  
  Supported Types

# Supported Types

### BOOL_VALUEs

- Supported values can have an optional suffix of ::BOOL or ::BOOLEAN
- FALSE, ‘FALSE’, ‘OFF’, ‘NO’, ‘0’::BOOL, and ‘0’::BOOLEAN are supported for false
- TRUE, ‘TRUE’, ‘ON’, ‘YES’, ‘1’::BOOL, and ‘1’::BOOLEAN are supported for true
- Lowercase versions are also supported (e.g., false, ‘off’, ‘no’)
- For string representations, prefixes that are unique are also valid (e.g., ‘F’ and ‘N’ are valid, ‘O’ is not)

### CONJUNCTIONs

- AND - This takes the intersection of two CLAUSEs  
  Also supported: and
- OR - This takes the union of two CLAUSEs  
  Also supported: or

### COLUMN_IDENTIFIERs

- {column_name} - The selector query will replace the column identifier with the column value for the specific column_name for a given user
- {column_name}->>’field_name’ - If column_name refers to a column that has a data type of address or composite, a valid subfield specified by field_name can be referenced in the column identifier.

### INT_VALUEs

- Supported values can have an optional suffix of ::INT or ::INTEGER
- Supported values can have an optional sign prefix (- or +)
- Values can be represented as numbers or quoted numbers (e.g., 42, ‘42’, -42, ‘+42’)

### LEFT_ARG_COLUMN_OPERATORs

- This takes a VALUE and a COLUMN as arguments (e.g., DATE_PART(VALUE, COLUMN))
- DATE_PART - This operates on a timestamp COLUMN, with the first argument being a keyword specifying a part of the timestamp to extract. The supported keywords include:
  - ‘day’
  - ‘dow’
  - ‘doy’
  - ‘epoch’
  - ‘hour’
  - ‘microseconds’
  - ‘milliseconds’
  - ‘minute’
  - ‘month’
  - ‘second’
  - ‘timezone’
  - ‘week’
  - ‘year’
- Also supported: date_part
- DATE_TRUNC - This operates on a timestamp COLUMN, with the first argument being a keyword specifying to what precision to truncate the timestamp. The supported keywords include:
  - ‘day’
  - ‘hour’
  - ‘microseconds’
  - ‘milliseconds’
  - ‘minute’
  - ‘month’
  - ‘second’
  - ‘week’
  - ‘year’
- Also supported: date_trunc

### NO_ARG_COLUMN_OPERATORs

- This takes a COLUMN as the sole argument (e.g., ABS(COLUMN))
- ABS - This operates on an integer column, and returns the absolute value of the associated integer value  
  Also supported: abs
- CHAR_LENGTH - This operates on a string column, and returns the number of characters in the associated string value  
  Also supported: CHARACTER_LENGTH, char_length, character_length
- LOWER - This operates on a string column, and returns the lowercase version of the associated string value  
  Also supported: lower
- UPPER - This operates on a string column, and returns the uppercase version of the associated string value  
  Also supported: upper

### NULL_CHECKs

- IS NULL - This tests whether the column value is null
  - Also supported: is_null
- IS NOT NULL - This tests whether the column value is not null
  - Also supported: is_not_null

### OPERATORs

- `=` - This operator tests whether the COLUMN value equals the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `!=` - This operator tests whether the COLUMN value is not equal to the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `<=` - This operator is supported for all column types other than address or composite, and tests whether the COLUMN value is less than or equal to the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `>=` - This operator is supported for all column types other than address or composite, and tests whether the COLUMN value is greater than or equal to the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `<` - This operator is supported for all column types other than address or composite, and tests whether the COLUMN value is less than the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `>` - This operator is supported for all column types other than address or composite, and tests whether the COLUMN value is greater than the VALUE. The type of the COLUMN value must match the type of the VALUE.
- `LIKE` - This operator is supported for string columns, and tests whether the pattern specified by VALUE matches the column value. See PSQL documentation for information about the supported format of the VALUE pattern.
- `ILIKE` - This operator is supported for string columns, and tests whether the pattern specified by VALUE matches the column value in a case-insensitive way. See PSQL documentation for information about the supported format of the VALUE pattern.

### QUOTED_VALUEs

- QUOTED_VALUEs must begin and end with single quote.
- A single quote may be escaped with another single quote (e.g., ‘string with ‘’single quote"’)
- A QUOTED_VALUE for a UUID must be of the form ‘NNNNNNNN-NNNN-NNNN-NNNN-NNNNNNNNNNNN', where N is a valid hex character.
- A QUOTED_VALUE for a timestamp must be a string format accepted by PSQL for a timestamp.
- A QUOTED_VALUE may optionally have one of the following suffixes:
  - ::BOOL
  - ::BOOLEAN
  - ::INT
  - ::INTEGER
  - ::TIMESTAMP
  - ::UUID
  - ::VARCHAR

### RIGHT_ARG_COLUMN_OPERATORs

- This takes a COLUMN and a VALUE as arguments (e.g., DIV(COLUMN,VALUE))
- DIV - This operates on an integer COLUMN, with the second argument being an integer divisor value and the result being the integer quotient from dividing the COLUMN value by the divisor.
  - Also supported: div
- MOD - This operates on an integer COLUMN, with the second argument being an integer divisor value and the result being the integer remainder from dividing the COLUMN value by the divisor.
  - Also supported: mod

### VALUE_PLACEHOLDER

- ? - This signifies a value placeholder. An accessor or mutator caller must provide a value with a compatible type for the associated clause that the VALUE_PLACEHOLDER is a part of.

# Example

The following are all examples of valid selector queries:

| Selector Clause                                        | Description                                                                                                                  |
| :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `ALL`                                                  | return all users                                                                                                             |
| `{BoolColumn} = TRUE`                                  | return users where BoolColumn value is true                                                                                  |
| `{BoolColumn} = ‘0’::BOOLEAN`                          | return users where BoolColumn value is false                                                                                 |
| `{BoolColumn} = ?`                                     | return users where BoolColumn value equals parameterized value                                                               |
| `{IntColumn} = ?`                                      | return users where IntColumn value equals parameterized value                                                                |
| `{IntColumn} = 1`                                      | return users where IntColumn value equals 1                                                                                  |
| `{IntColumn} = -1`                                     | return users where IntColumn value equals -1                                                                                 |
| `{IntColumn} = +1`                                     | return users where IntColumn value equals 1                                                                                  |
| `{IntColumn} = ANY ?`                                  | return users where the IntColumn value is any of the array values specified in the parameterized value                       |
| `{IntColumn} = ANY ARRAY[3, 4::INT, ?]`                | return users where the IntColumn value is either 3, 4, or the parameterized value                                            |
| `ABS(MOD({IntColumn},3)) = ?`                          | return users where the absolute value of IntColumn value mod 3 equals parameterized value                                    |
| `DIV({IntColumn}, ?) = ?`                              | return users where the quotient of dividing the IntColumn value by a parameterized value equals a second parameterized value |
| `{AddressColumn}->>’country’ IS NULL`                  | return users where the country field of AddressColumn is not set                                                             |
| `{AddressColumn}->>’country’ = ?`                      | return users where the country field of AddressColumn equals the parameterized value                                         |
| `{AddressColumn}->>’country’ = ‘USA’`                  | return users where the country field AddressColumn is ‘USA’                                                                  |
| `{StringColumn} LIKE ?`                                | return users that have a StringColumn value that matches the parameterized pattern                                           |
| `{StringColumn} LIKE ‘%foo%’`                          | return users that have a StringColumn value that contains the string ‘foo’                                                   |
| `lower({StringColumn}) = ANY ARRAY[‘foo’,’bar’,’baz’]` | return users that have a StringColumn value that when lower-cased equals either ‘foo’, ‘bar’, or ‘baz’                       |
| `char_length({StringColumn}) = ?`                      | return users that have a StringColumn value with a character length equal to a parameterized value                           |
| `date_part(?, {TimestampColumn}) = ?`                  | return users that have a particular date part of a TimestampColumn that equals a particular value                            |
| `date_trunc(‘day’, {TimestampColumn}) = ?`             | return users that have a TimestampColumn value, truncated to day, that matches a parameterized timestamp                     |
| `{BoolColumn} = TRUE OR {IntColumn} = ?`               | return users that have a BoolColumn value that is true or an IntColumn value that equals a parameterized value               |

# Best Practices

- **Be Specific**: Aim to make your selectors as specific as possible to avoid unnecessary data retrieval or modification. This improves performance and reduces the risk of unintended side effects.
- **Limit Use of the ALL Clause**: Use the ALL clause sparingly, as it can significantly impact performance by retrieving or modifying every record in a dataset.
- **Avoid Unnecessary Complexity**: Keep selector clauses as simple and readable as possible, as you would for a normal SQL query. For example, when filtering based on different possible values for a column, using the LIKE or ILIKE operator for string columns or the ANY operator to compare against a collection of possible values is both more efficient and easier to understand than enumerating the possibilities with a series of terms.
- **Test Selectors Thoroughly**: Before deploying selectors in a production environment, test them with various input scenarios to ensure they behave as expected.

# FAQs

**Q: What happens if the number of values in SelectorValues doesn't match the number of variables in the selector?**

A: The execution will result in an error. It's crucial that the number of values in SelectorValues exactly matches the number of variable placeholders in the selector, and that the type of each value in SelectorValues matches the expected type of the placeholder, to ensure proper execution.

**Q: How do I handle dynamic queries with multiple possible conditions?**

A: Use value placeholders (?) for dynamic values and construct your selector logic to accommodate various conditions. You may also use logical operators (AND, OR) to combine multiple conditions, and use parentheses to define precedence of conditions based on application logic.

**Q: Are there any limitations on the types of columns that can be used in selectors?**

A: All columns can be used in selectors. However, the operators available for a column are based on the data type of the column. This is covered in Supported Types, above, but a few concrete examples include that the text pattern matching operators (LIKE and ILIKE) are only available for string columns, and mathematical operators such as ABS, DIV, and MOD are only available for integer columns (or when passed an argument that has produced an integer value).
