# verify-number
WebComponent that provides opportunity to verify number.
## Usage
### Installation
```sh
npm i verify-number
```
### In  HTML file
```html
<html>
  <head>
  </head>
  <body>
    <verify-number mask="+7(985)0II-**-**" errortext="Wrong number"></verify-number>
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
```
### In head of your index.js
```typescript
import 'verify-number';
```
## Attributes
```typescript
interface IAttributes {
  mask: string;
  /**
  	 * Following values of symbol:
  	 * "I" - single input for entering a single digit
  	 * "X" - gray block with "X"
  	 * "*" - gray block with "●"
  	 * <number> - gray block with digit
  	 * <other> - symbol display inline
  Example: mask="+7(985)III-II-I*"
  	 */
  errortext: string;
      // A string representation of the error text that can appears under input
      // Example: errortext="Wrong number" 
  iserror: string;
    /** Changes the error state
      	 * Following values:
      	 * "false"
      	 * "true"
      Example: iserror="false"
      	 */
  value: string;
  // Example: "1,2,,3" 
}
```
## Attention
You need to only refer to verify-number element after its defining. See demo
```typescript
window.customElements.whenDefined('verify-number').then(() => {
  //your code
});
```

## Contributing
Instructions for running demo locally:
### Installation
```sh
git clone git@github.com:FedorBilichenko/verify-number.git
cd verify-number
npm i
```
### Running the demo locally
```sh
npm start
```
and visit `http://0.0.0.0:9001`

