# d’Post

Invite only DAO message board for d’Org culture

## Personal Intro

My name is Louis Parker. I have been developing fullstack + solidity code for about a year. I met many of the d’Org team at EthDenver 2020, where I won first prize at the hackathon with my talented partner (and fellow d’Org crew member) Jake Hamilton, building bonding curve markets for global impact events. Many thanks to the timely snowfall sparking the idea for snowfall futures markets.

## Project Description

Many great ideas spring from the mindshare generated by networking talented people in a shared space. Hackathons are such a great nexus event, as the constraints of physicality possess natural curative propensities for generating spaces of like-minded individuals. ClubHouse is an example of a popular application which has recently risen to prominence through the creation of a highly curated space for Silicon Valley mindshare. It is increasingly necessary to create such highly curated spaces for productive mindshare which are entirely virtual. In order to accomplish the aforementioned task, social dapps must incorporate mechanisms which are conducive towards the curation of members which befit the social calibur of the desired milieu. In other words, virtual social spaces must intimately cater to the habits and productive modes of their members.

With these ideas in mind, I built d'Post: an invite-only message board on Ethereum. Governance of the board is directed by admins, while regular users can share and curate content. 

## Project

[dpost.netlify.app](http://dpost.netlify.app)

^Load with Rinkeby and contact me for an invite and some testnet ETH

For my activation proposal I have built d’Post, a working social space catered towards a culture interested in information concerning Ethereum, DeFi, and software development. d’Post is a message board which incorporates the following mechanisms:
* Invite-only access 
* Limit posts to 200 characters
* Post curation through user signalling
* DAO governance for admin-level permissions
* Time-bound limitation on all user actions

The intended result of these mechanisms is to create a space for mindshare which will start with myself as the sole member and spread access to members of d’Org and people within the immediate network of d’Org members. With some success in user retention, d’Post can help to spread the culture of d’Org to a larger pool of talented individuals. 

## Timeframe

12 hours

## Design

Admin members, or `Captains`, can add additional `Captains`, as well as delete posts and users. `Captains` also have access to all regular user privileges. 

User members, or `Crewmates`, can create new posts and register more `Crewmates`. `Crewmates` curate posts by adding 'mood' to them, which is akin to upvoting. On the front end, upvoting is referred to as adding `Grog`. 

The contract initializes the creator as the first `Captain`, and from there the userbase grows through invitations to new users.

I use mobX in combination with ethers.js on the front end for state management which keeps account of blockchain events. New posts are caught through their emitted events and update the local store, which updates the components which rely on that information. Most styling is accomplished with Chakra UI.

In an effort to foster a more thoughtful environment less prone to spam, all actions which change contract state impose a time restriction on the caller. The user is notified of how many minutes they have remaining before they can engage in another action on d'Post.

Here is a list of user functions and the time restriction they impose before further actions may be taken by that user:
* `addAdmin`: 4 hours. Adds new `Captain`. May only be called by `Captains`.
* `addUser`: 4 hours. Adds new `Crewmate`.
* `addPost`: 4 hours. Creates new post.
* `postMood`: 2 hours. Adds `Grog` to the specified post.
* `removeUser`: 2 hours. Removes the specified `Crewmate`. May only be called by `Captains`.
* `removePost`: 2 hours. Removes the specified post. May only be called by `Captains`.

## Future Development

If the d'Org community finds this dapp useful, a migration onto xDAI would make it cheaper and more accessible. `Captains` and `Users` can be intitialized from existing members of the d'Org team. To retain privacy of posts, they could be stored on a server and only accessed by verified users. In this case, the contract would store all of the metadata of d'Post, but none of the post content.
