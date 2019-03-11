const isNumber = require( 'lodash/isNumber' );
const inRange = require( 'lodash/inRange' );
const assert = require( 'assert' );

function createSliceStream( start, end = Infinity ){

  assert( isNumber( start ) , 'start must be a number' );
  assert( start >= 0, 'start must be >= 0' );
  assert( isNumber( end ), 'end must be a number' );

  let count = 0;

  function transform( item, _, next ){

    if( inRange( count, start, ( end + 1 ) ) ){

      if( count === end ){

        this.emit( 'end' );
        this.unpipe();
      
      }
      count++;
      return process.nextTick( next.bind( null, null, item ) );
    
    }
    count++;

    next();

  }

  return require( 'stream' ).Transform( {
    objectMode: true,
    transform
  } );

}

module.exports = createSliceStream;
