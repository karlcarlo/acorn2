// 基础测试
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// 断言值为真
QUnit.test( "ok test", function( assert ) {
  assert.ok( true, "true succeeds" );
  assert.ok( 1, "number 1 succeeds" );
  assert.ok( {"key":"value"}, "object succeeds" );
  assert.ok( "non-empty", "non-empty string succeeds" );
 
  assert.ok( false, "false fails" );
  assert.ok( 0, "0 fails" );
  assert.ok( NaN, "NaN fails" );
  assert.ok( "", "empty string fails" );
  assert.ok( null, "null fails" );
  assert.ok( undefined, "undefined fails" );
});

// 断言相等
QUnit.test( "equal test", function( assert ) {
  assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
  assert.equal( "", 0, "Empty, Zero; equal succeeds" );
  assert.equal( "", "", "Empty, Empty; equal succeeds" );
  assert.equal( 0, false, "Zero, false; equal succeeds" );
 
  assert.equal( "three", 3, "Three, 3; equal fails" );
  assert.equal( null, false, "null, false; equal fails" );
});

// 深度相等
QUnit.test( "deepEqual test", function( assert ) {
  var obj = { foo: "bar" },
      obj1 = {foo: "bar", bla: "bla"};
 
  assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
  assert.deepEqual( obj1, { foo: "bar" }, "Two objects can be the same in value" );
});

// 预期断言次数
QUnit.test( "a test", function( assert ) {
  assert.expect( 2 );
 
  function calc( x, operation ) {
    return operation( x );
  }
 
  var result = calc( 2, function( x ) {
    assert.ok( true, "calc() calls operation function" );
    return x * x;
  });
 
  assert.equal( result, 4, "2 squared equals 4" );
});

// 预期DOM交互产生断言次数
QUnit.test( "a test", function( assert ) {
  assert.expect( 1 );
 
  var $body = $( "body" );
 
  $body.on( "click", function() {
    assert.ok( true, "body was clicked!" );
  });
 
  $body.trigger( "click" );
});

// 异步预期断言
QUnit.asyncTest( "asynchronous test: one second later!", function( assert ) {
  assert.expect( 1 );
 
  setTimeout(function() {
    assert.ok( true, "Passed and ready to resume!" );
    QUnit.start();
  }, 1000);
});

// 测试用户交互
function KeyLogger( target ) {
  if ( !(this instanceof KeyLogger) ) {
    return new KeyLogger( target );
  }
  this.target = target;
  this.log = [];
 
  var self = this;
 
  this.target.off( "keydown" ).on( "keydown", function( event ) {
    self.log.push( event.keyCode );
  });
}

QUnit.test( "keylogger api behavior", function( assert ) {
 
  var event,
      $doc = $( document ),
      keys = KeyLogger( $doc );
 
  // trigger event
  event = $.Event( "keydown" );
  event.keyCode = 9;
  $doc.trigger( event );
 
  // verify expected behavior
  assert.equal( keys.log.length, 1, "a key was logged" );
  assert.equal( keys.log[ 0 ], 9, "correct key was logged" );
 
});

// Keeping Tests Atomic
QUnit.test( "Appends a div", function( assert ) {
  var $fixture = $( "#qunit-fixture" );
 
  $fixture.append( "<div>hello!</div>" );
  assert.equal( $( "div", $fixture ).length, 1, "div added successfully!" );
});
 
QUnit.test( "Appends a span", function( assert ) {
  var $fixture = $( "#qunit-fixture" );
 
  $fixture.append("<span>hello!</span>" );
  assert.equal( $( "span", $fixture ).length, 1, "span added successfully!" );
});

// 全局污染
QUnit.test( "global pollution", function( assert ) {
  window.pollute = true;
  assert.ok( pollute, "nasty pollution" );
});

// 分组测试
QUnit.module( "group a" );
QUnit.test( "a basic test example", function( assert ) {
  assert.ok( true, "this test is fine" );
});
QUnit.test( "a basic test example 2", function( assert ) {
  assert.ok( true, "this test is fine" );
});
 
QUnit.module( "group b" );
QUnit.test( "a basic test example 3", function( assert ) {
  assert.ok( true, "this test is fine" );
});
QUnit.test( "a basic test example 4", function( assert ) {
  assert.ok( true, "this test is fine" );
});

QUnit.module( "module", {
  setup: function( assert ) {
    assert.ok( true, "one extra assert per test" );
  }, 
  teardown: function( assert ) {
    assert.ok( true, "and one extra assert after each test" );
  }
});
QUnit.test( "test with setup and teardown", function( assert ) {
  assert.expect( 2 );
});

// Custom Assertions
QUnit.assert.contains = function( needle, haystack, message ) {
  var actual = haystack.indexOf(needle) > -1;
  QUnit.push(actual, actual, needle, message);
};
QUnit.test("retrieving object keys", function( assert ) {
  var objectKeys = Object.keys( { a: 1, b: 2 } );
  assert.contains( "a", objectKeys, "Object keys" );
  assert.contains( "b", objectKeys, "Object keys" );
 
  var arrayKeys = Object.keys( [1, 2] );
  assert.contains( "1", arrayKeys, "Array keys" );
  assert.contains( "2", arrayKeys, "Array keys not contains 2" );
});

