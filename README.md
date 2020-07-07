# Filter-Highlight-Delete
A userscript that highlights, lowlights, or deletes elements based on child text elements.  
Preconfigured to work on Google News, Youtube and Reddit.  
This script only works when selectors and filter rules are set.

Additional functionality can be added with [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar) and [Script Options](https://github.com/erickRecai/Script-Options) scripts.

This script works mostly client side aside from the following external libraries:  
[jQuery](https://jquery.com/): Used to handle page events.  
[waitForKeyElements](https://github.com/erickRecai/): Used to handle dynamic execution.

# How it works
Using jQuery, this script either deletes or adds an html class to an element if the element matches your selectors and your filter rules.
A more thorough description of how the script works is documented inside the code.

# Installation
Requires a browser extension that enables userscripts to install this userscript. I personally use Tampermonkey but other extensions should work as well.  

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)  
[Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

To install this script specifically, just the `.user.js` file needs to downloaded.

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
[More information about regular expressions can be found here.](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)  
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

# Additional functions can be added with Collapsable Toolbar, Script Options, and Custom Rules

#### [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar) adds a persistent element which you can hide or close. This is mainly to contain various script options and buttons.

#### [Script Options](https://github.com/erickRecai/Script-Options) allows you change various script options and to disable/enable specific filter rules.
Otherwise, these options can be changed within the script in the section `AC. script options`.  
![Script Options](/instruction-images/4a-script-options.png)

#### [Custom Rules](https://github.com/erickRecai/Custom-Rules) gives you the ability to define filter rules and selectors without going into the script itself.

![Custom Rules](/instruction-images/4b-custom-rules.png)

How the scripts are ordered are generally the order that they run. There is a required order if you want everything to show up correctly should you want an onscreen user interface.
1. [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar)
2. [Script Options](https://github.com/erickRecai/Script-Options)
3. [Custom Rules](https://github.com/erickRecai/Custom-Rules)
4. Replace Text
5. [Filter, Highlight, & Delete](https://github.com/erickRecai/Filter-Highlight-Delete)