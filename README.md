# Filter-Highlight-Delete
A userscript that highlights, lowlights, or deletes elements based on child text elements.  
Preconfigured to work on Google News, Youtube and Reddit.  
This script only works when selectors and filter rules are set.

# How it works
Using jQuery, this script either deletes or adds an html class to an element if the element matches your selectors and your filter rules.
A more thorough description of how the script works is within the code itself.

# Installation
Requires a browser extension that enables userscripts to install this userscript. I personally use Tampermonkey but other extensions should work as well.  
Chrome:  
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en  
Firefox:  
https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/  
To install this script specifically, just the `user.js` file needs to downloaded.

# Instructions
### 1. Set up a parent selector and text selector.
You should use a selector that only selects the parent elements you want to filter.
You can define multiple selector sets should you want to filter multiple types of elements.

![Default Selectors](/instruction-images/1a-selectors.png)

A CSS extention would help in visually identifing what your selectors select.

Here are some CSS rules you can use.  
Parent CSS:  
`{border:solid 2px #fcc}`  
Text CSS:  
`{border:solid 2px #0f0}`  
Just disable these rules when done.  
![CSS to check selectors](/instruction-images/1b-selecting-selectors.png)
* Sites may change class names so you may need to update these selectors from time to time.

#### With Collapsable Toolbar and Custom Rules, you can define these selectors on a page itself.
![Custom Selectors](/instruction-images/1z-custom-selectors.png)

### 2. Set up some filter rules.
![Default Filter Rules](/instruction-images/2a-filter-rules.png)

### 3. Set up css for Lowlight and Highlight classes.
The element classes used are:
```
.fhd-lowlight1 //strong lowlight
.fhd-lowlight2 //weak lowlight
.fhd-highlight1 //strong highlight
.fhd-highlight2
```

#### The default CSS which can be switched on using Script Options:
![Default Filter CSS](/instruction-images/3a-filter-css.png)
