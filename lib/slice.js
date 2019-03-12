const isNumber = require( 'lodash/isNumber' );
const inRange = require( 'lodash/inRange' );
const assert = require( 'assert' );

function createSliceStream( start, end = Infinity ){

  assert( isNumber( start ) , 'start must be a number' );
  assert( start >= 0, 'start must be >= 0' );
  assert( isNumber( end ), 'end must be a number' );

  let index = 0;

  function transform( item, _, next ){

    if( inRange( index, start, end  ) ){

      if( index === end ){

        
        this.unpipe();
        this.emit( 'end' );
        return next();
      
      }
      index++;
      return next( null, item );
    
    }
    index++;

    next();

  }

  return require( 'stream' ).Transform( {
    objectMode: true,
    transform
  } );

}

module.exports = createSliceStream;
