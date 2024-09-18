using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OnboardingTask.Server.Models;

public partial class OnboardingTaskContext : DbContext
{
	public OnboardingTaskContext()
	{
	}

	public OnboardingTaskContext(DbContextOptions<OnboardingTaskContext> options)
		: base(options)
	{
	}

	public virtual DbSet<Customer> Customers { get; set; }

	public virtual DbSet<Product> Products { get; set; }

	public virtual DbSet<Sale> Sales { get; set; }

	public virtual DbSet<Store> Stores { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer("Server=localhost;Initial Catalog=OnboardingTask;Trusted_Connection=True;TrustServerCertificate=true;Integrated Security=false;User Id=SA;Password=l0cal$ql-123");

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Sale>(entity =>
		{
			entity.HasOne(d => d.Customer).WithMany(p => p.Sales).HasConstraintName("FK_Sales_Customer");

			entity.HasOne(d => d.Product).WithMany(p => p.Sales).HasConstraintName("FK_Sales_Product");

			entity.HasOne(d => d.Store).WithMany(p => p.Sales).HasConstraintName("FK_Sales_Store");
		});

		OnModelCreatingPartial(modelBuilder);
	}

	partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
