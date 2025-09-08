<?php

namespace App\Results;

class MessageResult
{
    public function __construct(
        public string $message,
        public bool $isSuccess,
        public int $status_code
    ) {
    }
}