using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("Provinces", Schema = "Base")]
    public partial class Provinces
    {
        public Provinces()
        {
            Cities = new HashSet<Cities>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(128)]
        public string ProvinceName { get; set; }
        public int? SortOrder { get; set; }
        public bool IsActive { get; set; }

        [InverseProperty("Province")]
        public virtual ICollection<Cities> Cities { get; set; }
    }
}
