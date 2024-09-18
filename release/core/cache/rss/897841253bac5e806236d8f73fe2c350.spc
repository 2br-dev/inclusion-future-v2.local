a:6:{s:5:"child";a:1:{s:0:"";a:1:{s:3:"rss";a:1:{i:0;a:6:{s:4:"data";s:4:"
  
";s:7:"attribs";a:1:{s:0:"";a:1:{s:7:"version";s:3:"2.0";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";s:5:"child";a:1:{s:0:"";a:1:{s:7:"channel";a:1:{i:0;a:6:{s:4:"data";s:55:"
    
    
    
    
      
      
        
        
  ";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";s:5:"child";a:2:{s:0:"";a:5:{s:5:"title";a:1:{i:0;a:5:{s:4:"data";s:33:"Security Notices - MODX Community";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"link";a:1:{i:0;a:5:{s:4:"data";s:62:"https://community.modx.com/c/announcements/security-notices/26";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:11:"description";a:1:{i:0;a:5:{s:4:"data";s:167:"Topics in the 'Security Notices' category This is a subcategory of Announcements for Security Notices. Older security notices can be found in the archived MODX Forums.";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:13:"lastBuildDate";a:1:{i:0;a:5:{s:4:"data";s:31:"Wed, 24 Apr 2019 15:36:05 +0000";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"item";a:2:{i:0;a:6:{s:4:"data";s:130:"
          
          
          
          
          
          
          
          
          
          
          
        ";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";s:5:"child";a:3:{s:0:"";a:7:{s:5:"title";a:1:{i:0;a:5:{s:4:"data";s:34:"MODX setup/ Directory Site Exploit";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:8:"category";a:1:{i:0;a:5:{s:4:"data";s:16:"Security Notices";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:11:"description";a:1:{i:0;a:5:{s:4:"data";s:4041:"
            <p><strong>Product:</strong> MODX Revolution<br>
<strong>Severity:</strong> Critical<br>
<strong>Versions:</strong> &lt;=2.7.0<br>
<strong>Vulnerability type(s):</strong> Site Exploit<br>
<strong>Date Published:</strong> 2019-04-01</p>
<p><strong>Issue</strong><br>
There is currently an active exploit of sites with an intact MODX Revolution <code>setup/</code> directory. This can give <em>anyone</em> on the internet complete access to your site and possibly your server with trivial effort. This directory should <em>never</em> be left in place once a site is installed.</p>
<p><strong>Check Your Site</strong><br>
You can check if your site is vulnerable by entering your site URL with a <code>/setup/</code> added at the end, for example:<br>
<code>https://www.example.com/setup/</code></p>
<p><strong>What to Do</strong><br>
If you see a MODX installation utility, you should log into your server via FTP or SSH <strong>immediately</strong>, and remove this directory. If your site is working as expected, your site may be safe, but please review the additional information below.</p>
<p><strong>Why it Matters</strong><br>
Using the MODX installation script above, a malicious individual can re-install MODX and point to any database they wish including remote databases. Once a site is “re-installed” they can then use the Manager’s file manager to upload other back door files to your server. This can potentially lead to more severe issues such as having the entire server <a href="https://en.wikipedia.org/wiki/Rootkit">rootkitted</a>, setting up spam mailers, or uploading crypto miners to take advantage of computing resources on your server.</p>
<p><strong>If Your Site Has Been Compromised</strong><br>
If your site has been compromised or is not working correctly, and the setup folder per the above was in place, you must first re-connect your site to the correct database and server. Ask your web host or sysadmin to reset your database password and give you the new database credentials. Once you have those, update the MODX config file—by default located at <code>core/config/config.inc.php</code>—with the correct settings.</p>
<p><strong>Keep Up with Updates</strong><br>
You should also upgrade your MODX version to the latest production release (currently 2.7.1) and upgrade all Extras if they are not current. Keeping up with updates is critical to maintaining a secure site, as it plays a key role in <a href="https://support.modx.com/hc/en-us/articles/360010644353-How-Websites-Get-Hacked-and-How-to-Protect-Yourself">helping prevent sites from compromise</a>.</p>
<p><strong>Malware Scanning</strong><br>
Finally, you should run a malware scanner to make sure other exploits haven’t already been uploaded to your site as described above. We have a series of articles that walks you through recovering from a site compromise, which hopefully will help in this effort:</p>
<ul>
<li><strong><a href="https://modx.com/blog/recovering-from-a-hacked-site-part-1" class="inline-onebox">Recovering from a Hacked Site: Part 1</a></strong></li>
<li><strong><a href="https://modx.com/blog/recovering-from-a-hacked-site-part-2" class="inline-onebox">Recovering from a Hacked Site: Part 2</a></strong></li>
<li><strong><a href="https://modx.com/blog/recovering-from-a-hacked-site-part-3" class="inline-onebox">Recovering from a Hacked Site: Part 3</a></strong></li>
</ul>
<p><strong>Need Help?</strong><br>
If your web host, developer or sysadmin is not able to help, you can open a commercial support ticket directly with MODX by visiting <a href="https://support.modx.com/">https://support.modx.com</a> and clicking the blue “Submit a request” link in the header (please mention this post and provide your site URL). In order to assist we will need access to your server, most likely via your cPanel login.</p>
            <p><small>1 post - 1 participant</small></p>
            <p><a href="https://community.modx.com/t/modx-setup-directory-site-exploit/648">Read full topic</a></p>
          ";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"link";a:1:{i:0;a:5:{s:4:"data";s:66:"https://community.modx.com/t/modx-setup-directory-site-exploit/648";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:7:"pubDate";a:1:{i:0;a:5:{s:4:"data";s:31:"Wed, 24 Apr 2019 15:36:05 +0000";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"guid";a:1:{i:0;a:5:{s:4:"data";s:28:"community.modx.com-topic-648";s:7:"attribs";a:1:{s:0:"";a:1:{s:11:"isPermaLink";s:5:"false";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:6:"source";a:1:{i:0;a:5:{s:4:"data";s:34:"MODX setup/ Directory Site Exploit";s:7:"attribs";a:1:{s:0:"";a:1:{s:3:"url";s:70:"https://community.modx.com/t/modx-setup-directory-site-exploit/648.rss";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}s:32:"http://purl.org/dc/elements/1.1/";a:1:{s:7:"creator";a:1:{i:0;a:5:{s:4:"data";s:7:"rthrash";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}s:25:"http://www.discourse.org/";a:3:{s:11:"topicPinned";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:11:"topicClosed";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:13:"topicArchived";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}}}i:1;a:6:{s:4:"data";s:130:"
          
          
          
          
          
          
          
          
          
          
          
        ";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";s:5:"child";a:3:{s:0:"";a:7:{s:5:"title";a:1:{i:0;a:5:{s:4:"data";s:35:"About the Security Notices category";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:8:"category";a:1:{i:0;a:5:{s:4:"data";s:16:"Security Notices";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:11:"description";a:1:{i:0;a:5:{s:4:"data";s:332:"
            <p>This is a subcategory of Announcements for Security Notices. Older security notices can be found in the archived MODX Forums.</p>
            <p><small>1 post - 1 participant</small></p>
            <p><a href="https://community.modx.com/t/about-the-security-notices-category/2264">Read full topic</a></p>
          ";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"link";a:1:{i:0;a:5:{s:4:"data";s:69:"https://community.modx.com/t/about-the-security-notices-category/2264";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:7:"pubDate";a:1:{i:0;a:5:{s:4:"data";s:31:"Tue, 01 Jan 2013 05:00:00 +0000";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:4:"guid";a:1:{i:0;a:5:{s:4:"data";s:29:"community.modx.com-topic-2264";s:7:"attribs";a:1:{s:0:"";a:1:{s:11:"isPermaLink";s:5:"false";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:6:"source";a:1:{i:0;a:5:{s:4:"data";s:35:"About the Security Notices category";s:7:"attribs";a:1:{s:0:"";a:1:{s:3:"url";s:73:"https://community.modx.com/t/about-the-security-notices-category/2264.rss";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}s:32:"http://purl.org/dc/elements/1.1/";a:1:{s:7:"creator";a:1:{i:0;a:5:{s:4:"data";s:11:"smashingred";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}s:25:"http://www.discourse.org/";a:3:{s:11:"topicPinned";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:11:"topicClosed";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}s:13:"topicArchived";a:1:{i:0;a:5:{s:4:"data";s:2:"No";s:7:"attribs";a:0:{}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}}}}}s:27:"http://www.w3.org/2005/Atom";a:1:{s:4:"link";a:1:{i:0;a:5:{s:4:"data";s:0:"";s:7:"attribs";a:1:{s:0:"";a:3:{s:4:"href";s:66:"https://community.modx.com/c/announcements/security-notices/26.rss";s:3:"rel";s:4:"self";s:4:"type";s:19:"application/rss+xml";}}s:8:"xml_base";s:0:"";s:17:"xml_base_explicit";b:0;s:8:"xml_lang";s:0:"";}}}}}}}}}}}}s:4:"type";i:128;s:7:"headers";a:18:{s:6:"server";s:5:"nginx";s:4:"date";s:29:"Wed, 18 Sep 2024 06:07:51 GMT";s:12:"content-type";s:34:"application/rss+xml; charset=utf-8";s:10:"connection";s:10:"keep-alive";s:15:"x-frame-options";s:10:"SAMEORIGIN";s:16:"x-xss-protection";s:1:"0";s:22:"x-content-type-options";s:7:"nosniff";s:33:"x-permitted-cross-domain-policies";s:4:"none";s:15:"referrer-policy";s:31:"strict-origin-when-cross-origin";s:17:"x-discourse-route";s:18:"list/category_feed";s:26:"cross-origin-opener-policy";s:24:"same-origin-allow-popups";s:12:"x-robots-tag";s:7:"noindex";s:4:"vary";s:6:"Accept";s:13:"cache-control";s:18:"no-cache, no-store";s:18:"x-discourse-cached";s:5:"store";s:12:"x-request-id";s:36:"ea81c140-510f-44a8-b409-38807f275763";s:9:"x-runtime";s:8:"0.034719";s:25:"strict-transport-security";s:16:"max-age=31536000";}s:5:"build";i:1674167854;s:21:"cache_expiration_time";i:1726643274;s:23:"__cache_expiration_time";i:1726643274;}