# template-lint

![logo](https://d30y9cdsu7xlg0.cloudfront.net/png/30843-200.png)

Sanity check of template HTML. 

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Travis Status][travis-image]][travis-url]

##Info
This project was the result of wondering why aurelia applications had missing content when you used self-closing tags. In the end it turns out if your template html is ill formed, the browser parser will not complain and you will simply have missing content and/or an ill formed DOM element tree. 

See: 
* [StackOverflow: aurelia-self-closing-require-element-does-not-work](http://stackoverflow.com/questions/37300986/aurelia-self-closing-require-element-does-not-work)
* [StackOverflow: aurelia-sanity-check-template-html](http://stackoverflow.com/questions/37322985/aurelia-sanity-check-template-html)

The intended goal of this work is to sanity check your template html during the development cycle to highlight potential problems. 

This project serves as the basis for checking html and can be extended upon for different template flavors. 

## Rules
There are currently two rules bundled with this package:

* **SelfClose** 
  * *ensure non-void elements do not self-close* 
* **Parser**
  * *returns errors for unclosed or ill-matched elements, as captured during parsing*
  
##Usage

For use with gulp, [there is a gulp plugin available](https://github.com/MeirionHughes/gulp-template-lint)
 
  
##Icon

Icon courtesy of [The Noun Project](https://thenounproject.com/)

[npm-url]: https://npmjs.org/package/template-lint
[npm-image]: http://img.shields.io/npm/v/template-lint.svg
[npm-downloads]: http://img.shields.io/npm/dm/template-lint.svg
[travis-url]: https://travis-ci.org/MeirionHughes/template-lint
[travis-image]: https://img.shields.io/travis/MeirionHughes/template-lint/master.svg