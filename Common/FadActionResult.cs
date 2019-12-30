using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public class FadActionResult<T>
    {
        public bool IsSuccess { get; set; } = true;
        public List<T> Data { get; set; }
        public int? TotalCount { get; set; }
        public int? Pages { get; set; }
        public int CurrentPage { get; set; } = 1;
        public string Message { get; set; }
    }
}
