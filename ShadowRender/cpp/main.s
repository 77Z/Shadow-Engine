	.file	"main.cpp"
 # GNU C++ (GCC) version 4.8.3 (x86_64-w64-mingw32)
 #	compiled by GNU C version 4.8.3, GMP version 5.1.3, MPFR version 3.1.2, MPC version 0.8.2
 # GGC heuristics: --param ggc-min-expand=100 --param ggc-min-heapsize=131072
 # options passed: 
 # -iprefix c:\users\owner\documents\winbuilds\bin\../lib64/gcc/x86_64-w64-mingw32/4.8.3/
 # -D_REENTRANT .\main.cpp -mtune=generic -march=x86-64 -fverbose-asm
 # -IC:/Users/Owner/Documents/WinBuilds/include
 # options enabled:  -faggressive-loop-optimizations
 # -fasynchronous-unwind-tables -fauto-inc-dec -fbranch-count-reg -fcommon
 # -fdelete-null-pointer-checks -fdwarf2-cfi-asm -fearly-inlining
 # -feliminate-unused-debug-types -fexceptions -ffunction-cse -fgcse-lm
 # -fgnu-runtime -fident -finline-atomics -fira-hoist-pressure
 # -fira-share-save-slots -fira-share-spill-slots -fivopts
 # -fkeep-inline-dllexport -fkeep-static-consts -fleading-underscore
 # -fmath-errno -fmerge-debug-strings -fmove-loop-invariants -fpeephole
 # -fpic -fprefetch-loop-arrays -freg-struct-return
 # -fsched-critical-path-heuristic -fsched-dep-count-heuristic
 # -fsched-group-heuristic -fsched-interblock -fsched-last-insn-heuristic
 # -fsched-rank-heuristic -fsched-spec -fsched-spec-insn-heuristic
 # -fsched-stalled-insns-dep -fset-stack-executable -fshow-column
 # -fsigned-zeros -fsplit-ivs-in-unroller -fstrict-volatile-bitfields
 # -fsync-libcalls -ftrapping-math -ftree-coalesce-vars -ftree-cselim
 # -ftree-forwprop -ftree-loop-if-convert -ftree-loop-im
 # -ftree-loop-ivcanon -ftree-loop-optimize -ftree-parallelize-loops=
 # -ftree-phiprop -ftree-pta -ftree-reassoc -ftree-scev-cprop
 # -ftree-slp-vectorize -ftree-vect-loop-version -funit-at-a-time
 # -funwind-tables -fverbose-asm -fzero-initialized-in-bss
 # -m128bit-long-double -m64 -m80387 -maccumulate-outgoing-args
 # -malign-double -malign-stringops -mfancy-math-387 -mfentry
 # -mfp-ret-in-387 -mfxsr -mieee-fp -mlong-double-80 -mmmx -mms-bitfields
 # -mno-sse4 -mpush-args -mred-zone -msse -msse2 -mstack-arg-probe

	.def	__main;	.scl	2;	.type	32;	.endef
	.text
	.globl	main
	.def	main;	.scl	2;	.type	32;	.endef
	.seh_proc	main
main:
.LFB0:
	pushq	%rbp	 #
	.seh_pushreg	%rbp
	movq	%rsp, %rbp	 #,
	.seh_setframe	%rbp, 0
	subq	$48, %rsp	 #,
	.seh_stackalloc	48
	.seh_endprologue
	call	__main	 #
	movabsq	$6278066737626506568, %rax	 #, tmp63
	movq	%rax, -16(%rbp)	 # tmp63, textinp
	movl	$1684828783, -8(%rbp)	 #, textinp
	movw	$33, -4(%rbp)	 #, textinp
	leaq	-16(%rbp), %rax	 #, tmp61
	movq	%rax, %rcx	 # tmp61,
	call	_Z11simplePrintPc	 #
	movl	$0, %eax	 #, D.2215
	addq	$48, %rsp	 #,
	popq	%rbp	 #
	ret
	.seh_endproc
	.ident	"GCC: (GNU) 4.8.3"
	.def	_Z11simplePrintPc;	.scl	2;	.type	32;	.endef
