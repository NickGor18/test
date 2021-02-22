# makefile lab4

.SUFFIXES: .class .java

PACK=lab4
TARG=main
JC=javac -g
JM=java -ea -jar
JR=jar -cfe

OBJ=$(PACK)\Fraction.class \
    $(PACK)\main.class

.java.class:
	$(JC) $<

run: build
	$(JM) $(TARG).jar

build: 	$(OBJ)
	$(JR) $(TARG).jar $(PACK).main $(OBJ)

clean:
	for %%f in ($(OBJ)) do del %%f
	del $(TARG).jar

$(PACK)\Fraction.class: $(PACK)\Fraction.java makefile

$(PACK)\main.class: $(PACK)\main.java makefile

# eof makefile lab4
