package lab4;

public class Fraction {

	int a=1,b=1;
	
	public Fraction()
	{
		this.a=1;
		this.b=1;
	}
	public Fraction(int n)
	{
		this.a=n;
	}
	public Fraction(int n, int m)
	{
		assert(m!=0);
		this.a=n;
		this.b=m;
		this.Simplify();
	}
	public Fraction(Fraction f)
	{
		this.a=f.a;
		this.b=f.b;
	}
	private void Simplify()
	{
		int tmp1 = Math.abs(this.a);
		int tmp2 = Math.abs(this.b);
		while (tmp1 != tmp2)
		{
			if (tmp1>tmp2)
				tmp1 = tmp1 - tmp2;
			else
				tmp2 = tmp2 - tmp1;
		}
		if (tmp1 != 1)
		{
			b = b / tmp1;
			a = a / tmp1;
		}
		else
		{
			b=b/tmp2;
			a=a/tmp2;
		}
	}
	public Fraction add(Fraction f)
	{
		Fraction h=new Fraction(this);
		h.a=h.a*f.b+f.a*h.b;
		h.b=h.b*f.b;
		h.Simplify();
		return h;
	}
	public Fraction addInt(int f)
	{
		Fraction h=new Fraction(this);
		h.a=h.a+f*h.b;
		h.Simplify();
		return h;
	}
	public Fraction sub(Fraction f)
	{
		Fraction h=new Fraction(this);
		h.a=h.a*f.b-f.a*h.b;
		h.b=h.b*f.b;
		h.Simplify();
		return h;
	}
	public Fraction subInt(int f)
	{
		Fraction h=new Fraction(this);
		h.a=h.a-f*h.b;
		h.Simplify();
		return h;
	}
	public Fraction mult(Fraction f)
	{
		Fraction h = new Fraction(this);
		h.a=h.a*f.a;
		h.b=h.b*f.b;
		h.Simplify();
		return h;
	}
	public Fraction multInt(int f)
	{
		Fraction h=new Fraction(this);
		h.a=h.a*f;
		h.Simplify();
		return h;
	}
	public Fraction div(Fraction f)
	{
		Fraction h = new Fraction(this);
		h.a=h.a*f.b;
		h.b=h.b*f.a;
		h.Simplify();
		return h;
	}
	public Fraction divInt(int f)
	{
		Fraction h=new Fraction(this);
		h.b=h.b*f;
		h.Simplify();
		return h;
	}
	public void Print()
	{
		if(this.a==0)
		{
			System.out.println(this.a);
		}
		else
		{
		if(this.b==1)
		{
			System.out.println(this.a);
		}
		else
		{
		System.out.println(this.a+"/"+this.b);
		}
		}
	}
}
