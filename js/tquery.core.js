/**
 * @fileOverview This file is the core of tQuery library. 
*/

/**
 * Create a tQuery element
 *
 * @class root class
 * 
 * - do something for crawling the three
 *   - like python.walk ?
 * - docs with jsdoc
 *   - http://www.thebrightlines.com/2010/05/06/new-template-for-jsdoctoolkit-codeview/
 *
 * 
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
var tQuery	= function(object, root)
{
	if( object instanceof THREE.Object3D  && tQuery.Object3D){
		return new tQuery.Object3D(object);

	}else if( object instanceof THREE.Geometry && tQuery.Geometry){
		return new tQuery.Geometry(object);

	}else if( object instanceof THREE.Material && tQuery.Material){
		return new tQuery.Material(object);

	}else if( typeof object === "string" && tQuery.Object3D){
		return new tQuery.Object3D(object, root);

	}else{
		console.assert(false, "unsupported type")
	}
	return undefined;
};

/**
 * The version of tQuery
*/
tQuery.VERSION	= "1.0.0";


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * loop over a Array
 * 
 * @param {Array} arr the array to traverse
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.each	= function(arr, callback){
	for(var i = 0; i < arr.length; i++){
		var keepLooping	= callback(arr[i])
		if( keepLooping === false )	return false;
	}
	return true;
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Make an object pluginable
 * 
 * @param {Object} object the object on which you mixin function
 * @param {Object} dest the object in which to register the plugin
*/
tQuery.pluginsMixin	= function(object, dest){
	dest	= dest	|| object.prototype || object;
	object.register	= function(name, funct) {
		if( dest[name] ){
			throw new Error('Conflict! Already method called: ' + name);
		}
		dest[name]	= funct;
	};
	object.unregister	= function(name){
		if( dest.hasOwnProperty(name) === false ){
			throw new Error('Plugin not found: ' + name);
		}
		delete dest[name];
	};
	object.registered	= function(name){
		return dest.hasOwnProperty(name) === true;
	}
};


// make it pluginable
tQuery.pluginsMixin(tQuery, tQuery);

