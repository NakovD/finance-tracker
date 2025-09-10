<?php

namespace App\Results;

class DataResult
{
    public function __construct(
        public mixed $data,
        public string $message,
        public bool $isSuccess,
        public int $status_code
    ) {
    }
}