a1 = seq(from = 2,to = 3.9,by = 0.1)
print("Vector[2;4]: ")
print(a1)
a2 = sample(3:14,10,replace=T)
print("Vector[3;14]: ")
print(a2)
print("a1[2]*a2[3]: ")
print(a1[2]*a2[3])
a3 = scan()
print("Vector,scan(): ")
print(a3)
a4 = c(a3,a2)
print("Union of a2&a3 :")
print(a4)
x = scan("C:\\Programing\\R\\1.txt",integer(20))
print("X: ")
print(x)
print("Scalar x&a1: ")
print(x%*%a1)
print("Min of x: ")
print(min(x))
count = 0;
for(i in x){
  if(i>=8 && i<=10)count = count+1;
}
print("Count x[8;10]")
print(count)
m = scan("C:\\Programing\\R\\2.txt",integer(16))
print("M1")
m1 = matrix(m,nrow=4,ncol=4,byrow = TRUE)
print(m1)
m2 = matrix(seq(1,16),nrow=4,ncol=4,byrow=TRUE)
print("M2")
print(m2)
print("M1+M2")
print(m1+m2)
print("M1*M2")
print(m1%*%m2)
#10
d =det(m2)
print("Det m2: ")
print(d)
print("Linear system")
b = matrix(c(1, 0, -1, 2))
print(b)
x = solve(m1,b)
print(x)
Nrow = seq(from = 1,to = 15,by =1)
Name = scan("names.txt",what = character(15))
BirthYear = sample(seq(1960,1985),15,replace=T)
EmployYear = integer(15)
count = 0
for(i in 1:15){
  EmployYear[i]=sample((BirthYear[i]+18):2006,1)
}
Salary = integer(15)
for(i in 1:15){
  if(BirthYear[i]<1975){
    Salary[i]=(log(2007 - EmployYear[i]) + 1) * 8000
  }
  else{
    Salary[i]=(log((2007 - EmployYear[i]),base=2) + 1) * 8000
  }
}
myFrame = data.frame(Nrow,Name,BirthYear,EmployYear,Salary)
print(myFrame)
count = 0
for(i in 1:15){
  if(Salary[i]>15000)count=count+1;
}
print(count)
