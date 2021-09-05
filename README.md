# Simutrans dat file parser


## Usecase
### Parse from dat text

```
import { Dat } from 'simutrans-dat-parser';

const text = `obj=way
name=example1
waytype=road
---
obj=way
name=example2
waytype=track`;

const dat = new Dat(text);

dat.objs[0].findParam('waytype').value;
// 'road'
```

### Parse from single obj text

```
import { Obj } from 'simutrans-dat-parser';

const text = `obj=way
name=example1
waytype=road`;

const obj = new Obj(text);

obj.findParam('waytype').value;
// 'road'
```

### Manipulate values

```
import { Obj } from 'simutrans-dat-parser';

const text = `obj=way
name=example1
waytype=road
image[0][1]=example.3.4,5,6`;

const obj = new Obj(text);

const param = obj.findParam('image');

param.key
// 'image[0][1]'
param.keyVal
// 'image'
param.keyParams
// [0, 1]

param.value
// 'example.3.4,5,6'
param.valueVal
// 'example'
param.valueParams
// ['3','4','5','6']

param.isEmpty
// false
param.isComment
// false
param.isSplit
// false

param.toString()
// 'image[0][1]=example.3.4,5,6';
```


### Modify parameters

```
import { Obj } from 'simutrans-dat-parser';

const text = `obj=way
name=example1
waytype=road`;

const obj = new Obj(text);

obj.updateOrCreate('copyright', 'example')
```
