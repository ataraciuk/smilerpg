Smile: RPG
========

A role playing game that tests your ability and endurance to smile for a long time.

My start point is Lauren McCarthy Happiness Hat: http://lauren-mccarthy.com/happinesshat/
Instead of playing with negative reinforcement to make people smile, I will play with positive conditioning. So, I created this role playing game, where all the player has to do is smile. As the player keeps smiling, his character gains experience and keeps winning levels as a smiler.

In part, I created it as a parody/critique of grinder RPGs, where players do boring and repetitive tasks just to improve their character, with the sole reward as feeling more powerful in-game.

I find the idea of being forced of smiling, without being happy, quite interesting. To exaggerate this fact, I created the flow of writing something the user hates. Then, with the google search API, I show a picture of it. Then the game begins.

When the game ends, the 'reward' are the pop-ups with the possibility of posting the results to the social networks (twitter and Facebook). I wanted to create ironic messages to post. There are 3 components to it:

What does it mean to reach, say, level 12 as a smiler? What does that goal mean?

The second component of the post plays with the contradiction of showing an image of what the player hates and then asking him to smile at that. The reaction of the player to this will depend on their specific meaning out in 'hate'. If they chose something they fear, the phrase 'I spent # seconds smiling at a picture of X' makes sense as a good reward, because it can show overcoming fear. On the other hand, if the player chose, say, 'nazis', the message 'I spent # seconds smiling at a picture of nazis' is kind of an ironic congratulations message; not something you would feel proud to show your friends. This sensation of being tricked is what I wanted to achieve, showing the player the senseless of their actions.

The third component is for a discussion on privacy over the internet. Giving the player to show proudly a message like 'I allowed a stranger to access my camera for # seconds' is meant as a warning. When we give camera access to web page, we are giving them the option of storing a video of us somewhere.

Lastly, when the game ends 4 pop-ups are fired: 3 for twitter (one for each component of the message), and 1 for Facebook (all 3 components on same message). 4 pop-ups can be something annoying. The idea of this is to think about the pervasiveness of social networks. It's a shame browsers block pop-ups, the idea is a bit lost with the need of the player to allow the pop-ups.

========

Technology involved:

For smile detection in browser, I am using this library: https://github.com/roironn/SmileDetectJS

For showing an image based on the text input, I am using google search image API: https://developers.google.com/image-search/v1/devguide