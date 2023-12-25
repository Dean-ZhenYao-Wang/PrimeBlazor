using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace PrimeBlazor
{
    public static class ObjectUtils
    {
        public static object resolveFieldData(object data, string field)
        {
            if (data != null && !string.IsNullOrEmpty(field))
            {
                if (!field.Contains('.'))
                {
                    var type = data.GetType();
                    var property = type.GetProperty(field);
                    if (property != null)
                    {
                        return property.GetValue(data);
                    }
                }
                else
                {
                    var fields = field.Split('.');
                    var value = data;
                    foreach (var fieldName in fields)
                    {
                        var type = value.GetType();
                        var property = type.GetProperty(fieldName);
                        if (property != null)
                        {
                            value = property.GetValue(value);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    return value;
                }
            }

            return null;
        }
        public static bool equals(object obj1, object obj2,string field)
        {
            if(!string.IsNullOrWhiteSpace(field))
                return (resolveFieldData(obj1,field)==resolveFieldData(obj2,field));
            else
                return equalsByValue(obj1,obj2);
        }
        public static bool equalsByValue(dynamic obj1, dynamic obj2)
        {
            if (obj1 is null && obj2 is null)
            {
                return true;
            }
            if (obj1 is null || obj2 is null)
            {
                return false;
            }

            if (obj1 == obj2)
            {
                obj1._visited = null;
                return true;
            }

            if (obj1.GetType() == typeof(ExpandoObject) && obj2.GetType() == typeof(ExpandoObject))
            {
                obj1._visited = true;
                foreach (var property in (IDictionary<string, object>)obj1)
                {
                    if (property.Key == "_visited")
                    {
                        continue;
                    }

                    if (!(obj1.GetType().GetProperty(property.Key) is PropertyInfo obj1Property)
                        || !(obj2.GetType().GetProperty(property.Key) is PropertyInfo obj2Property))
                    {
                        return false;
                    }

                    switch (obj1Property.PropertyType.FullName)
                    {
                        case "System.Object":
                            if ((obj1Property.GetValue(obj1)!._visited ?? false) || !equalsByValue(obj1Property.GetValue(obj1), obj2Property.GetValue(obj2)))
                            {
                                return false;
                            }
                            break;

                        case "System.Func`1[System.Boolean]":
                            if (obj2Property is null || (property.Key != "compare" && obj1Property.ToString() != obj2Property.ToString()))
                            {
                                return false;
                            }
                            break;

                        default:
                            if (!Equals(obj1Property.GetValue(obj1), obj2Property.GetValue(obj2)))
                            {
                                return false;
                            }
                            break;
                    }
                }

                foreach (var property in (IDictionary<string, object>)obj2)
                {
                    if (obj1.GetType().GetProperty(property.Key) is null)
                    {
                        return false;
                    }
                }

                obj1._visited = null;
                return true;
            }

            return false;
        }
    }
}
