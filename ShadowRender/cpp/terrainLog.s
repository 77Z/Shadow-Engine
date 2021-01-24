	.file	"terrainLog.cpp"
 # GNU C++ (GCC) version 4.8.3 (x86_64-w64-mingw32)
 #	compiled by GNU C version 4.8.3, GMP version 5.1.3, MPFR version 3.1.2, MPC version 0.8.2
 # GGC heuristics: --param ggc-min-expand=100 --param ggc-min-heapsize=131072
 # options passed: 
 # -iprefix c:\users\owner\documents\winbuilds\bin\../lib64/gcc/x86_64-w64-mingw32/4.8.3/
 # -D_REENTRANT .\terrainLog.cpp -mtune=generic -march=x86-64 -fverbose-asm
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

.lcomm _ZStL8__ioinit,1,1
	.text
	.globl	_Z11simplePrintPc
	.def	_Z11simplePrintPc;	.scl	2;	.type	32;	.endef
	.seh_proc	_Z11simplePrintPc
_Z11simplePrintPc:
.LFB1023:
	pushq	%rbp	 #
	.seh_pushreg	%rbp
	movq	%rsp, %rbp	 #,
	.seh_setframe	%rbp, 0
	subq	$32, %rsp	 #,
	.seh_stackalloc	32
	.seh_endprologue
	movq	%rcx, 16(%rbp)	 # text, text
	movq	16(%rbp), %rdx	 # text,
	leaq	_ZSt4cout(%rip), %rcx	 #,
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc	 #
	leaq	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_(%rip), %rdx	 #,
	movq	%rax, %rcx	 # D.22525,
	call	_ZNSolsEPFRSoS_E	 #
	nop
	addq	$32, %rsp	 #,
	popq	%rbp	 #
	ret
	.seh_endproc
	.def	__tcf_0;	.scl	3;	.type	32;	.endef
	.seh_proc	__tcf_0
__tcf_0:
.LFB1033:
	pushq	%rbp	 #
	.seh_pushreg	%rbp
	movq	%rsp, %rbp	 #,
	.seh_setframe	%rbp, 0
	subq	$32, %rsp	 #,
	.seh_stackalloc	32
	.seh_endprologue
	leaq	_ZStL8__ioinit(%rip), %rcx	 #,
	call	_ZNSt8ios_base4InitD1Ev	 #
	nop
	addq	$32, %rsp	 #,
	popq	%rbp	 #
	ret
	.seh_endproc
	.def	_Z41__static_initialization_and_destruction_0ii;	.scl	3;	.type	32;	.endef
	.seh_proc	_Z41__static_initialization_and_destruction_0ii
_Z41__static_initialization_and_destruction_0ii:
.LFB1032:
	pushq	%rbp	 #
	.seh_pushreg	%rbp
	movq	%rsp, %rbp	 #,
	.seh_setframe	%rbp, 0
	subq	$32, %rsp	 #,
	.seh_stackalloc	32
	.seh_endprologue
	movl	%ecx, 16(%rbp)	 # __initialize_p, __initialize_p
	movl	%edx, 24(%rbp)	 # __priority, __priority
	cmpl	$1, 16(%rbp)	 #, __initialize_p
	jne	.L3	 #,
	cmpl	$65535, 24(%rbp)	 #, __priority
	jne	.L3	 #,
	leaq	_ZStL8__ioinit(%rip), %rcx	 #,
	call	_ZNSt8ios_base4InitC1Ev	 #
	leaq	__tcf_0(%rip), %rcx	 #,
	call	atexit	 #
	nop
.L3:
	addq	$32, %rsp	 #,
	popq	%rbp	 #
	ret
	.seh_endproc
	.def	_GLOBAL__sub_I__Z11simplePrintPc;	.scl	3;	.type	32;	.endef
	.seh_proc	_GLOBAL__sub_I__Z11simplePrintPc
_GLOBAL__sub_I__Z11simplePrintPc:
.LFB1034:
	pushq	%rbp	 #
	.seh_pushreg	%rbp
	movq	%rsp, %rbp	 #,
	.seh_setframe	%rbp, 0
	subq	$32, %rsp	 #,
	.seh_stackalloc	32
	.seh_endprologue
	movl	$65535, %edx	 #,
	movl	$1, %ecx	 #,
	call	_Z41__static_initialization_and_destruction_0ii	 #
	nop
	addq	$32, %rsp	 #,
	popq	%rbp	 #
	ret
	.seh_endproc
	.section	.ctors,"w"
	.align 8
	.quad	_GLOBAL__sub_I__Z11simplePrintPc
	.ident	"GCC: (GNU) 4.8.3"
	.def	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc;	.scl	2;	.type	32;	.endef
	.def	_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_;	.scl	2;	.type	32;	.endef
	.def	_ZNSolsEPFRSoS_E;	.scl	2;	.type	32;	.endef
	.def	_ZNSt8ios_base4InitD1Ev;	.scl	2;	.type	32;	.endef
	.def	_ZNSt8ios_base4InitC1Ev;	.scl	2;	.type	32;	.endef
	.def	atexit;	.scl	2;	.type	32;	.endef
