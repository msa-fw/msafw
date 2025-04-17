<?php

namespace System\Core\Form\Attributes;

use System\Core\Form\Attributes;

/**
 * Class DatetimeLocal
 * @method $this autocomplete(bool $value)
 * @method $this list($value)
 * @method $this max($value)
 * @method $this min($value)
 * @method $this readonly(bool $value)
 * @method $this required(bool $value)
 * @method $this step($value)
 * @package System\Core\Form\Attributes
 */
class DatetimeLocal extends Attributes
{
    public function __construct($name, &$field)
    {
        parent::__construct($name, $field);

        $this->class('datetime-local-field');
    }
}