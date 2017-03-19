# Boring Copy Cat

![Logo](https://github.com/samcheuk/boring-copy-cat/blob/master/copy_cat.png?raw=true)
---
Chrom extension that using regex expression to make a same copy in every similar page

### Install

Chrome extension store

[https://chrome.google.com/webstore/detail/boring-copy-cat/bgbngphkialhkmnbphjhlicnedejanni](https://chrome.google.com/webstore/detail/boring-copy-cat/bgbngphkialhkmnbphjhlicnedejanni)

### Example

In option page (right click icon)

Regex expression

```
"question-hyperlink">.+.<\/a>
```

from ... to ...

```
21
4
```

In every stackoverflow question page,

e.g. [http://stackoverflow.com/questions/35259538/why-did-conda-and-pip-just-stop-working-compiledffi-object-has-no-attribute/](http://stackoverflow.com/questions/35259538/why-did-conda-and-pip-just-stop-working-compiledffi-object-has-no-attribute/)

Click the extension icon and this question title will save into you clipboard, *Ctrl(Command) + V* will show:

**Why did conda and pip just stop working? 'CompiledFFI' object has no attribute 'def_extern'**

