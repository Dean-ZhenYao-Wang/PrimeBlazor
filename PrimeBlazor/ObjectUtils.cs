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
        public static object? ResolveFieldData(object? data, string? field)
        {
            if (data != null && !string.IsNullOrEmpty(field))
            {
                if (!field.Contains('.'))
                {
                    var type = data.GetType();
                    var property = type.GetProperty(field);
                    if (property != null)
                    {
#pragma warning disable CS8603 // 可能返回 null 引用。
                        return property.GetValue(data);
#pragma warning restore CS8603 // 可能返回 null 引用。
                    }
                }
                else
                {
                    var fields = field.Split('.');
                    var value = data;
                    foreach (var fieldName in fields)
                    {
#pragma warning disable CS8602 // 解引用可能出现空引用。
                        var type = value.GetType();
#pragma warning restore CS8602 // 解引用可能出现空引用。
                        var property = type.GetProperty(fieldName);
                        if (property != null)
                        {
                            value = property.GetValue(value);
                        }
                        else
                        {
#pragma warning disable CS8603 // 可能返回 null 引用。
                            return null;
#pragma warning restore CS8603 // 可能返回 null 引用。
                        }
                    }
#pragma warning disable CS8603 // 可能返回 null 引用。
                    return value;
#pragma warning restore CS8603 // 可能返回 null 引用。
                }
            }

#pragma warning disable CS8603 // 可能返回 null 引用。
            return null;
#pragma warning restore CS8603 // 可能返回 null 引用。
        }
        public static bool Equals(object? obj1, object? obj2,string? field)
        {
            if(!string.IsNullOrWhiteSpace(field))
                return (ResolveFieldData(obj1,field)==ResolveFieldData(obj2,field));
            else
                return EqualsByValue(obj1,obj2);
        }
        public static bool EqualsByValue(dynamic? obj1, dynamic? obj2)
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
                return true;
            }

            if (obj1.GetType() == typeof(ExpandoObject) && obj2.GetType() == typeof(ExpandoObject))
            {
                foreach (var property in (IDictionary<string, object>)obj1)
                {
                    if (obj1.GetType().GetProperty(property.Key) is not PropertyInfo obj1Property
                        || obj2.GetType().GetProperty(property.Key) is not PropertyInfo obj2Property)
                    {
                        return false;
                    }

                    switch (obj1Property.PropertyType.FullName)
                    {
                        case "System.Object":
                            if (!EqualsByValue(obj1Property.GetValue(obj1), obj2Property.GetValue(obj2)))
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

                return true;
            }

            return false;
        }
    }
}
