# 🧠 Regular Expressions Cheat Sheet

This cheat sheet is focused on understanding core regex concepts, especially quantifiers and character classes — great for tasks like text cleaning and pattern matching.

---

## 🔤 Character Classes

| Pattern         | Description                                 | Matches                        |
|----------------|---------------------------------------------|--------------------------------|
| `.`             | Any character except newline                | `a`, `1`, `@`, etc.            |
| `\w`            | Word character = `[a-zA-Z0-9_]`              | `a`, `9`, `_`                  |
| `\W`            | Not a word character                        | `@`, `!`, space                |
| `\d`            | Digit = `[0-9]`                             | `0` to `9`                     |
| `\D`            | Not a digit                                 | `a`, `-`, `@`                  |
| `\s`            | Whitespace (space, tab, newline, etc.)      | `" "`, `\n`, `\t`              |
| `\S`            | Non-whitespace                              | `a`, `1`, `@`                  |
| `[abc]`         | Match **a**, **b**, or **c**                | `a`                            |
| `[^abc]`        | Match anything **except** a, b, or c        | `x`, `1`, `@`                  |
| `[a-z]`         | Lowercase letters from a to z               | `e`, `m`, `z`                  |
| `[A-Z0-9]`      | Uppercase letters and digits                | `G`, `2`, `Z`                  |

---

## 🔁 Quantifiers

| Pattern      | Description                                           | Example Matches             |
|--------------|-------------------------------------------------------|-----------------------------|
| `a?`         | Zero or one occurrence of `a`                         | `""`, `a`                   |
| `a*`         | Zero or more occurrences of `a`                       | `""`, `a`, `aaa`            |
| `a+`         | One or more occurrences of `a`                        | `a`, `aa`, `aaaa`           |
| `a{3}`       | Exactly 3 `a`s                                        | `aaa`                       |
| `a{2,4}`     | Between 2 and 4 `a`s                                  | `aa`, `aaa`, `aaaa`         |
| `a{2,}`      | 2 or more `a`s                                        | `aa`, `aaaaa`, etc.         |

---

## 🧩 Anchors

| Pattern | Description                     |
|---------|---------------------------------|
| `^`     | Start of string or line         |
| `$`     | End of string or line           |
| `\b`    | Word boundary                   |
| `\B`    | Not a word boundary             |

---

## 🔗 URL Matching Example

```regex
https?://[^\s<>"]+|www\.[^\s<>"]+
