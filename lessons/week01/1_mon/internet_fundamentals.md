# How the Internet works - a crash course

## Objectives
*After this lesson, students will be able to:*

- Explain the differences between a client and server
- Explain the difference between the Internet and the World Wide Web
- Explain the significance of an Internet Protocol (IP) address
- Explain how data travels through the internet
- Breakdown the components of a URL: protocol, subdomain, domain, extension, resources
- Identify and describe the most common HTTP request/response headers and the information associated with each

## Preparation
*Before this lesson, students should already be able to:*

* Use a web browser
* Use a terminal

## The internet at a (very) low level

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> open a terminal, expand the window (with alt-f10?) and type `ping www.facebook.com`. Watch the output. Type cmd-c to stop. What are you looking at? Google some answers to the following and see if you can get an idea of what ping does:
* "what does ping do"
* "what is ping's output"
* "what is the difference between TIME and TTL"

Is there any confusion on the web about TTL? Finally, skim through the official (and confusing?) manual - type  `man ping`. 'f' and 'b' go forwards and backwards in the manual. Press 'q' to quit the manual.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> open a terminal, expand the window (with alt-f10?) and type `traceroute www.facebook.com`. Is `traceroute` not installed? What is linux suggesting you do? Follow the instructions for installation and retry. What are you looking at? Google the following:
* "what is traceroute"
* "traceroute output"
* "traceroute asterisks"

Finally, skim the manual by typing `man traceroute`. 'f' and 'b' go forwards and backwards in the manual. Press 'q' to quit the manual.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> open a terminal, expand the window and type `ifconfig`. What is this telling you? What would you google to find out? Try the following:
* "what is ifconfig"
* "ifconfig output"

Ifconfig will probably have only 2 or 3 entries - a wired connection if you have one (starting with 'en...' for ethernet), a local loop (ie your machine, starting with 'lo...') and a wireless (wifi) connection (starting with 'wl...'). Find the internet address _the local router has randomly assigned_ to your wifi ( a weird number in 4 parts after 'inet'). Keep this handy for the next bit.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> Install nmap by typing `sudo apt-get install nmap`. This is a **SU**peruser **DO** command so you'll have to type your password. Now type `nmap xxx.xxx.xxx.xxx/24` where all the x's are replaced by your network card. What is this output telling you? What does nmap do? Google the following:
* "what does nmap stand for"
* "what does nmap do"
* "nmap what is an open port"

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> finally, type `curl ipinfo.io/ip`. What is this ip address? Google this command.

Notice I said earlier that the local router has randomly assigned an ip address to your machine. It will do this for all devices that attach to it. How? What problems could this cause (hint: you hard-code your ip into your app!) Could you get the router to assign a fixed ip? Try googling the following:

* "beginners guid dhcp"
* "home router dhcp"
* "dhcp vs static"

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> in a terminal type ifconfig again. Search for 'ether'. You should see 6 groups of twin characters separated by colons eg '08:9e:01:bf:31:1e'. This is the mac address of your computer. Now find the mac address of your phone. Try googling 'your-phone-brand mac address'.

[What is a MAC address](http://whatismyipaddress.com/mac-address)? Who decides what it is, and when does it get assigned?

Think about this conversation:
* "hello everyone on my network, I am 08:9e:01:bf:31:1e. Is there anyone that can give me an IP address?"
* "hello 08:9e:01:bf:31:1e, this is 192.168.0.1, you can have 192.168.0.91"

With what you have learned about the low level internet, what's happening in this conversation?

### networking models as layers.

There are a number of models used to describe what's going on in a network. Looking at this graphic, which layers do you think we have been exploring so far:

![osi model](https://microchip.wdfiles.com/local--files/tcpip:tcp-ip-five-layer-model/layer_terminology.JPG)

## protocols - the language we all agree to speak

Once a network connection is made (ethernet, wifi) and we can communicate (MAC address, ip number), we need to agree on what language we will use. This is where TCP and UDP come in.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> in a terminal type `ss -t`. This is a socket summary for all your computer connections that are using TCP. Now type `ss -ul` - these connections are all using UDP. In both cases the first column of IP numbers will be your machine. The second column will be the machines out on the internet that you are connected to. What are all these addresses your computer is talking to? Try typing `whois xxx.xxx.xxx.xxx` where the x's are the ip address of a remote machine in your output.

### what's the difference between TCP and UDP.

Google 'tcp vs udp' and think about a connection to a bank and a connection via skype. Form an opinion about tcp and udp based on speed, order and error checking.

## The application layer

Now that we're connected and we've agreed on a language, what do we want to do? We might want to swap web pages using http, or files using ftp, or do either in a secure manner using https or sftp. What do each of these mean? Google 'http and ftp'. How would you describe them in simple terms?

Revisiting the [OSI layers model](https://en.wikipedia.org/wiki/OSI_model), which layers do you think tcp, udp, http and ftp fit in?

![osi model](https://microchip.wdfiles.com/local--files/tcpip:tcp-ip-five-layer-model/layer_terminology.JPG)

## Reserved ports

In addition to using a specific transport protocol (tcp or udp) a lot of the application protocols (http, ftp etc) use specific ports. Find out which ports are used for

* http
* https
* ftp
* ssh
* mysql
* MongoDB
* gmail

### The internet - how does it work?

Coffee time!

Reviewing your terminal work so far, what can you say about the internet and how it works?

## HTTP 101

The internet comes down to requests and responses - you send information out to the web, and based on the info you send, you get information back.

Back in the 1980's, computers connected to each other over the Internet using their own language and protocols; if you wanted to connect to a server at a university, you had to figure out what protocol and language it was using and the operating system too. This quickly became a mess, as more and more systems and universities joined the Internet. Communicating with any given institution required supporting and switching between all kinds of protocols.

Along came HTTP: HTTP stands for "Hyper Text Transfer Protocol" - because it's a protocol, it allows for communication between a variety of different computers and supports a ton of different network configurations. To make this possible, it assumes very little about a particular system, and does not keep state between different message exchanges.

Read this as: "HTTP makes it easy for many different computers to talk to each other."

This makes HTTP a stateless protocol.

Let's define the following vocabulary:

- **Host** - a computer or other device connected to a computer network; host may offer information resources, services, and applications (via computer code!) to users or other computers on the network
  - Ex: servers and web services
- **Client** - the requesting program in the client/host relationship; the client initiates an HTTP request message, which is serviced through a HTTP response message in return
  - Ex: browsers, terminals, SQL clients

![](https://upload.wikimedia.org/wikipedia/commons/c/c9/Client-server-model.svg)

To sum it up, communication between a host and a client occurs via a request/response pair. The client initiates an HTTP request message, which is serviced through a HTTP response message in return. We will look at this fundamental message-pair in the next section.


Now, we're making this really simple, just to give you the big idea - there are a ton of intricacies that go into getting your request message to the right place and delivering the information you requested.  We'll go into more detail today and over the rest of the course.

_Text From [Tuts +](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)_


#### How to reach a specific server

All computers on the internet have a unique numeric address. This is the way computers find "each other" when communicating. You may recognize the format below - it's an IP address:

```
123.123.123.123
```

Traditionally, IP addresses are composed of four bytes of data separated by periods. Since four bytes *only* offer around 4.3 billion unique IP addresses, they've all but run out.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> in a console type 'ifconfig'. Look for 'inet' and 'inet6'. What are these? Google the following:

* "inet vs inet6"
* "ip4 and ip6"

A migration is underway to IPv6 that uses 16 bytes - these new addresses will be represented as eight groups of four hexadecimal digits. With each group separated by colons, the addresses will look like this:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Given the potential combinations, this new protocol could produce up to 340 trillion trillion trillion unique addresses.

By the way, IPv4 addresses neatly fit inside IPv6 addresses:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
2001:0db8:85a3::8a2e:0370:7334
::ffff:192.0.2.128
```

#### IP Addresses to domains

Of course, these numbers are hard to remember, and are not really human-friendly. Can you imagine if website addresses had to be given this way? Instead of commercials on the radio saying "go to OurWebsite.com", they'd be saying "go to 12.14.142.231" and repeating it five times just to make sure everyone got it!

So what was needed was a way to translate real names in to those numbers. This is why we have domain registrars - basically, you reserve the name, and at the domain registrar, your domain name is pointed to the server's particular unique address.

When you type a website domain in to your web browser (or other internet capable app), what happens is a "DNS Lookup" of that particular domain's IP address, so your computer can actually connect to it.  DNS stands for "Domain Name System", and it's the way that Internet domain names are located and translated into Internet Protocol addresses.

| Domain Name  | IP Address    |
|--------------|---------------|
| apple.com    | 17.172.224.47 |
| facebook.com | 31.13.65.1    |
| google.com   | 216.58.192.46 |

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> in a console type `whois 17.172.224.47`

So when you go to apple.com, your browser asks a DNS server "what is the IP address of apple.com?" The DNS server responds with "17.172.224.47", and the browser can then connect to 17.172.224.47.

In real world terms, it's like how we use street addresses for finding a house, rather than using Latitude and Longitude coordinates - they're easier to remember and to read.

#### How DNS Servers Look Up IP Addresses

Your computer looks up IP addresses for domains by asking the nearest DNS server - typically, the local Wi-Fi router. The Wi-Fi router will not know the IP address unless it was previously looked up, so, the router will go further up the hierarchy to your internet service provider's DNS server.

Often, another ISP customer has already requested the domain lookup and the IP address is cached for a while, allowing a quick response.

Otherwise, the lookup is escalated to the top level domain (TLD) registry that has a list of registrars per domain. The registrar is the final authority that resolves the IP address.

The response is passed back along the chain and cached at each step to speed up future lookups. The ultimate source of all domain names are the 13 root DNS servers:

![root servers](http://www.sebastianthiem.de/pics/rootserver.png)

> Note: The caching along the chain is great for performance. However, changing the IP address of a domain name will not propagate to all visitors until cached lookups expire.

#### Client and server communication

All client-server protocols operate in the application layer. The application-layer protocol defines the basic patterns of the dialogue.

A server may receive requests from many different clients in a very short period of time. Because the computer can perform a limited number of tasks at any moment, it relies on a scheduling system to prioritize incoming requests from clients in order to accommodate them all in turn.

To prevent abuse and maximize uptime, the server's software limits how a client can use the server's resources. Even so, a server is not immune from abuse. A denial of service attack exploits a server's obligation to process requests by bombarding it with requests incessantly. This inhibits the server's ability to respond to legitimate requests.

#### Example

*When a bank customer accesses online banking services with a web browser (the client), the client initiates a request to the bank's web server. The customer's login credentials may be stored in a database, and the web server accesses the database server as a client. An application server interprets the returned data by applying the bank's business logic, and provides the output to the web server. Finally, the web server returns the result to the client web browser for display.

In each step of this sequence of client–server message exchanges, a computer processes a request and returns data. This is the request-response messaging pattern. When all the requests are met, the sequence is complete and the web browser presents the data to the customer.*


*Taken from [Wikipedia](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)*

## What Is the Difference Between the Internet and the Web? Discussion (20 mins)

#### The Internet is a Big Collection of Computers and Cables

The Internet is named for "interconnection of computer networks". It is a massive hardware combination of millions of personal, business, and governmental computers, all connected like roads and highways.

No single person owns the Internet. No single government has authority over its operations. Some technical rules and hardware/software standards enforce how people plug into the Internet, but for the most part, the Internet is a free and open broadcast medium of hardware networking.

#### The Web Is a Big Collection of HTML Pages on the Internet

The World Wide Web, or "Web" for short, is a massive collection of digital pages: that large software subset of the Internet dedicated to broadcasting content in the form of HTML pages. The Web is viewed by using free software called web browsers. Born in 1989, the Web is based on hypertext transfer protocol, the language which allows you and me to "jump" (hyperlink) to any other public web page. There are over 65 billion public web pages on the Web today."

- Taken from [About Tech](http://netforbeginners.about.com/od/i/f/What-Is-The-Internet.htm)


#### Elements of a URL

URL stands for Uniform Resource Locator, and it's just a string of text characters used by Web browsers, email clients and other software to format the contents of an internet request message.

Let's breakdown the contents of a URL:



```
    http://www.example.org/hello/world/foo.html?foo=bar&baz=bat#footer
    \___/  \_____________/ \__________________/ \_____________/ \____/
  protocol  host/domain name        path         query-string     hash/fragment
```

Element | About
------|--------
protocol | the most popular application protocol used on the world wide web is HTTP. Other familiar types of application protocols include FTP, SSH, GIT, FILE, HTTPS
host/domain name | the host or domain name is looked up in DNS to find the IP address of the host - the server that's providing the resource
path | web servers can organize resources into what is effectively files in directories; the path indicates to the server which file from which directory the client wants
query-string | the client can pass parameters to the server through the query-string (in a GET request method); the server can then use these to customize the response - such as values to filter a search result
hash/fragment | the URI fragment is generally used by the client to identify some portion of the content in the response; interestingly, a broken hash will not break the whole link - it isn't the case for the previous elements

<br>
_The Schema above is from [Tuts +](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)_


When someone types `http://google.com` in a web browser, a new cycle resulting in an HTTP  Request/ Response is initiated.  Essentially, your browser is saying:

_"Hey, give me the information located at the web address 'google.com'"_

When the user press enter in the url input in a web browser, a `GET request` will start, this is what this request will look like:

![http request CLI](http://s27.postimg.org/u231qbweb/Screen_Shot_2015_08_15_at_15_27_13.png)


Note, the web page being requested is:

`http://www.google.co.uk/?gfe_rd=cr&ei=WkvPVabgC-HH8gfWjoCIAw`

Anything after the `?` is considered a parameter - information you're also giving to that web address in the query-string.

In the response, the HTTP version is provided, which in this case is 1.1.

The rest of the lines are HTTP headers, which do things like: tell the web server what website to retrieve, based on the domain (Host:); report the user-agent and acceptable encoding and language; and other browser-specific options.  

## Responding to a request - Intro (15 mins)


Once this request reaches the server, then this server will return a response to the request emitter.

HTTP responses are similar to HTTP requests in the way that they are text based and contain HTTP headers and status. Look on the first line above, again - the HTTP response returns the HTTP status code. This code is very useful for developers working with request/response cycles.  

They come as three digit numbers and dictate whether a specific HTTP requests has been successfully completed. Responses are grouped in five classes, with the first digit determining the higher-level categorization:

- 1xx Informational
- 2xx Success
- 3xx Redirection
- 4xx Client Error
- 5xx Server Error

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> in a console type `curl https://www.facebook.com`. You'll see the entire http code for facebook's home page. To prove it, dump the output into a file by typing `curl https://www.facebook.com > fbdump.html`. Now use a file finder to double-click on this file and view it in a browser. Or if you have chromium installed, type `chromium-browser fbdump.html`

Now repeat the command but this time get information about the page rather than the page itself. Type `curl -I https://www.facebook.com` (note: that is https with an 's'). This is the server **response** to our client **request**. Notice the resonse code of 200. What does this mean?

Now repeat the request with only http - `curl -I http://www.facebook.com`. What does this response code mean?

Now try with `curl -I https://www.facebook.com/blah`. What does this response code mean?

After the status code, some server headers are sent, including information about the type of server and software it’s running. Next, the body of the response contains the data we requested, which is generally HTML, CSS, Javascript, or binary data like an image or PDF.

<img src='https://raw.githubusercontent.com/ga-students/WDI-HK-14/master/images/favicon.ico'
width='20' alt='terminal work' align='left' hspace='20'> now check `man curl`. Scroll to the end - as you can see, this is an enormously powerful command line program. Press 'q' to quit the manual for curl.

## Server-side vs. Client-side

Using network layers 1 - 5 the app on the front end (your phone, laptop) sends a **request** to the app on the backend ie the server. The backend will look at the request, decide if some code needs to run, if some information is needed from a database server etc and will produce a **response**. This is sent back to the client using the same 5 network layers. The yellow lines in this image represent the five layers:

![](https://qph.ec.quoracdn.net/main-qimg-c8a2fb5df9d9031c29dbb9966b1fb142)

The server contains code - Ruby, PHP, Java, even JavaScript - that processes your request.  Depending on the contents of your request, the server will execute different files on the server that contain code.  Then, the server will return a particular set of information and data.

The information and data received is usually packaged in an HTML document with some CSS and JavaScript files. You may also get a PDF, image, and/or other file types. The location of the resource is specified by the user using a URI (Uniform Resource Identifier).

The way the browser interprets and displays HTML files is detailed in the HTML and CSS specifications. These specifications are maintained by the W3C (World Wide Web Consortium) organization, an important standards organization for the web. The JavaScript language specification is published by a technical committee (TC39) at the ECMA organization.


_Taken from  [HTML5Rocks](http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)_


## Review of Internet Fundamentals - Independent Practice (10 mins)

Answer and discuss the following questions with a partner:

- What does HTTP stand for?
- Which protocol is used to resolve a domain name to an IP address?
- How do clients compare to hosts?
- Compare different HTTP status codes.
- Draw your own diagram of a request/response cycle and label where the following would come into play: client, host/server, URL, client-side languages, server-side languages, data
- T/F: HTTP headers can be changed by a user before executing a request.
- T/F: Every HTTP request has a domain and a path.
- T/F: Email uses the HTTP Protocol.


## Conclusion (5 mins)
> Note: Review the answers to the previous activity.

The foundational concepts taught in this lesson will be important for the duration of the course because we will use the internet everyday, and if you are struggling with how the data is received on the server, please come back to this lesson and ask questions to your instructional team.
