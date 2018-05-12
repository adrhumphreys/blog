---
date: 2017-07-30T21:02:08-04:00
description: "Megamenu"
tags: ["dev"]
title: "Making an accessible mega menu"
---

For a lot of large sites we need to make mega menus that look nice, behave nice and are accessible. Usually accessibility suffers and only people with no disabilities can use them effectively.

So for our basic mega menu which would have just one menu underneath each/some of the list items we would want something like this:

<!--more-->

```html
<nav role="navigation" aria-label="navigation with dropdowns">
  <ul class="with-dropdowns">
    <li>
      <a href="#">Home</a></li>
      <li>
        <a href="/about" aria-haspopup="true">About</a>
        <nav>
          <ul aria-hidden="true" aria-label="submenu">
            <li><a href="/about/#who-we-are">Who we are</a></li>
            <li><a href="/about/#what-we-do">What we do</a></li>
            <li><a href="/about/#why">Why</a></li>
          </ul>
         </nav>
       </li>
       <li><a href="#">Blog</a></li>
       <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

Simple solutions are good solutions. For a basic implementation we can use the ``` aria-haspopup ``` tag which alerts you to the presence of a submenu. The addition of an ```aria-label``` with the value 'submenu' it helps confirm there is a submenu with the first element. We'd then need to add some javascript so that when the element is clicked we show the dropdown, set ```aria-hidden``` to false and then focus the first list item. You'd then on mouse leave hide it.

This isn't nice for performance though, we're now checking where the mouse is constantly, enough of this and the performance of the page would take a hammering. Not including the problem of users without javascript enabled (if we care about them?).

If pressed for time you could make the menu with links to each section so that anyone needing the sub menu items they can just click the link, be presented with the page which should have a static menu (either at the top or on the side of the page).

{{< megamenu >}}

We're then presented with a few different solutions. We could make the elements hidden by hiding interactive content from the display. This works for screen readers but makes keyboard users have to tab through content that they can't see (which mean's their experience is ruined). For just a navigation menu it's probably safe and preferred to use some javascript and aria tags and make the experience good for everyone. 
