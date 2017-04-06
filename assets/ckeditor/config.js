/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

  config.toolbar = [
    {name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ]},
    {name: 'insert', items: ['Image','Table','HorizontalRule','SpecialChar']},
    {name: 'tools', items: ['Maximize']},

    {name: 'document', items: ['Source']},

    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike','-','RemoveFormat' ]},
    '/',
    {name: 'paragraph', items: ['NumberedList', 'BulletList', '-','Outdent','Indent','-','Blockquote']},
    {name: 'styles', items: ['Styles', 'Format']}
  ];

};

