using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class PageState
    {
        public int first { get; set; }
        public int rows { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
    }
}
