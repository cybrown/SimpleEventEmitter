SimpleEventEmitter
==================

Author: Cy Brown
Version: 0.0.1
LastUpdate: 8 July 2013

Simple Javascript EventEmitter with very poor features for medium apps.

Features:

-Up to 3 parameters for callbacks, without using arguments special value.
-In a callback, the context is the event emitter itself, when subclassing it, it points to the emitting object.
-Context for callbacks can be changed.
-Support vanilla JS and AMD module.
