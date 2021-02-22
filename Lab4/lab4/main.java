package lab4;
import java.util.Random;
import java.util.Scanner;
public class main {

	public static void main(String[] args) 
	{
		Random rnd=new Random();
		Scanner in=new Scanner(System.in);
		Fraction f = new Fraction(1,4);
		Fraction g = new Fraction(1,2);
		int n;
		System.out.println("First fraction");
		f.Print();
		System.out.println("Second fraction");
		g.Print();
		System.out.print("Summ of fractions: ");
		f=f.add(g);
		f.Print();
		System.out.println("Summ of fraction and digit: ");
		f=f.addInt(5);
		f.Print();
		System.out.print("Sub of fractions: ");
		f=f.sub(g);
		f.Print();
		System.out.println("Sub of fraction and digit: ");
		f=f.subInt(6);
		f.Print();
		System.out.println("Multiply of fractions: ");
		f=f.mult(g);
		f.Print();
		System.out.println("Multiply of fraction and digit: ");
		f=f.multInt(5);
		f.Print();
		System.out.println("Divide of fractions: ");
		f=f.div(g);
		f.Print();
		System.out.println("Divide of fraction and digit: ");
		f=f.divInt(3);
		f.Print();
		System.out.println("Pick size of massive");
		n=in.nextInt();
		Fraction []j=new Fraction[n];
		System.out.println("1.Make massive randomly or 2.Fill it manually?");
		int k=in.nextInt();
		System.out.println("Massive of fractions");
		if(k==1)
		{
		for(int i=0;i<n;i++)
		{
			int a=rnd.nextInt(10)+1,b=rnd.nextInt(10)+1;
			j[i]=new Fraction(a,b);
			j[i].Print();
		}
		}
		else
		{
			for(int i=0;i<n;i++)
			{
				System.out.println("Enter numenator, then denominator");
				int a=in.nextInt();
				int b=in.nextInt();
				j[i]=new Fraction(a,b);
			}
			for(int i=0;i<n;i++)
			{
				j[i].Print();
			}
		}
	}

}
