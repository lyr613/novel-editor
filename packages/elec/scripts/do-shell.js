const cp = require('child_process')

const o = {
	do_shell_try(s) {
		try {
			const c = cp.execSync(s)
		} catch (error) {}
	},
	do_shell(s) {
		cp.execSync(s)
	},
	/** 非同步 */
	do_shell_with_log(s) {
		const c = cp.exec(s)
		c.stdout.on('data', msg => {
			console.log(msg)
		})
	},
}

module.exports = o
