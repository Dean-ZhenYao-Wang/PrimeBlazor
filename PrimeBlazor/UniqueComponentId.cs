using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public static class UniqueComponentId
    {
        private static int lastId = 0;
        public static string ComponentId(string prefix = "pv_id_")
        {
            lastId++;
            return $"{prefix}{lastId}";
        }
    }
}
