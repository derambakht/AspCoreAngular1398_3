using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public class DataGridModel<T>
    {
        public List<DataGridColumn> Columns { get; set; } = new List<DataGridColumn>();
        public List<T> Data { get; set; } = new List<T>();
        public int? Pages { get; set; }
        public int Page { get; set; } = 1;
    }

    public class DataGridColumn
    {
        public string Header { get; set; }
        public string Accessor { get; set; }
    }
}
