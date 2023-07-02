# Enfield Secondary School map

A quick JS project to plot Enfield secondary schools and their radius of intake.
To demonstrate how few people actually have a choice.

## Production

The `docs/` folder is published as a static site using Github page. The
production URL is: https://codeinthehole.com/enfield-schools/

## Local dev

### Installation

Ensure Hugo is installed.

### Data

"Furthest distance offered" numbers are taken from:

- "Transfer to secondary school and allocations" documents, published on the
  [Enfield Council website](https://www.enfield.gov.uk/services/children-and-education/school-admissions-and-applications)
- "How places were allocated at Barnet Secondary Schools" documents, published
  on the Barnet Council website.

### Deploying

Compile site and push:

```bash
$ make build
$ git push
```
