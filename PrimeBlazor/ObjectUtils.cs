using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public static class ObjectUtils
    {
        public static string resolveFieldStringData<TEntity>(TEntity data,string field)
        {
            if (data != null && !string.IsNullOrWhiteSpace(field))
            {
                
                if (!field.Contains("."))
                {
                    var propertyInfo = data.GetType().GetProperty(field);
                    return propertyInfo.GetValue(data).ToString();
                }
                else
                {
                    var fields = field.Split(".");
                    object valueData = data;
                    for(int i=0,len=fields.Length; i<len; ++i)
                    {
                        var propertyInfo = data.GetType().GetProperty(fields[i]);
                        valueData = propertyInfo.GetValue(valueData);
                    }
                    return valueData.ToString();
                }
            }
            else
            {
                return null;
            }
        }
    }
}
