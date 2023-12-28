using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public class QuillTextChange
    {
        public string htmlValue { get; set; }
        public string textValue { get; set; }
        public object delta { get; set; }
        public object source { get; set; }
    }
}
