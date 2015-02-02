<?php

class Tasks extends \Phalcon\Mvc\Model
{
	public $id;

	public $name;

	public $short_description;

	public $long_description;

	public $day;

	public $started;

	public $completed;
}