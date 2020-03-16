# TinyComment
Teeny tiny, PHP-based, easy-to-deploy self-hosted comment system for static websites.

# Installation
1) Download the repo and extract it to the root of your website. (eg. https://yourwebsite.com/tinycomment/)
2) Give appropriate permission to the /data/ folder. Your server's PHP-User (www-data in Ubuntu/Debian) should be able to Read, Write and Execute in the folder.
3) Put the below code snippet to your website:

```html
<div data-tinycomment></div
<script src="http://yourwebsite.com/tinycomment/script.js" data-tinycomment-path="http://yourwebsite.com/tinycomment"></script>
```
Replace http://yourwebsite.com/tinycomment with the path you extracted the TinyComment in Step 1.

# Contribution
TinyComment is in very early stage of development. So any contribution is welcomed; no matter how small it is. But do keep the following in mind while contributing.
1) We want the project to be small, so the number of files should be kept minimal.
2) Any change you bring should not add any extra step for the user in the deployment process. We want the user to be able to just extract the files and get on with it.
3) Use PSR-12 style guidelines.

# To-Do

# License
Copyright (C) 2020 Mohamed Adhuham

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
