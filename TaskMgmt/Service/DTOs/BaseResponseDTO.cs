﻿namespace Service
{
    public class BaseResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public dynamic Data { get; set; }
    }
}
