---
title: the 2026 AI infra startup template
description: fork any startup
publishedAt: 2026-07-13
slug: 2026-ai-infra-startup-template
---
I was scrolling the list of hot, new AI infra YC startups, as one does, and before completely developing psychosis, I began to realize something. ProjectX, kernel, s2, Brawndo, Zingly (ok yes the last two aren't real, but does it matter if you can’t tell?). What’s the one thing all these startups building for agents have in common? They’re managed networked linux services that can be shared, snapshotted, and forked. Now, what exactly gets snapshotted depends on the service. For browsers, it’s the cookies and session state. For sandboxes, it’s the entire filesystem and RAM. It doesn’t matter, they can all be simplified down to a single underlying primitive: the filesystem. (Yes, of course they also have their own firecracker VM infra but that’s hardly interesting enough to talk about anymore.)

I argue that by implementing a necessary set of operations for the filesystem, those operations can also be implemented for any managed linux application. I like to reason about examples so let's just apply this logic to a few startups, working with the assumption that we have the ability to share, snapshot, and fork a filesystem.
```rust
trait FileSystem: Send + Sync {
    fn mount(&self); // mount the filesystem onto the disk
    fn snapshot(&self, path: Path) -> Id; // id corresponding to immutable filesystem snapshot
    fn fork(&self, path: Path) -> Self; // snapshots and creates new mutable branch
    // and of course the standard class of filesystem operations
    fn read(...) ...
    fn write(...) ...
}
```

# Browser as a Service
There are a quite few startups offering managed browsers as a service now: Cloudflare (Browser Run), Browserbase, Browserless, Kernel, etc. These, at their core, are Chrome browsers running on a sandbox with an exposed port for the Chrome DevTools Protocol that a client connects to. Then you add in some nice features, like saving cookies and application data across different sessions.
```javascript
Browser.new:
    fs = FileSystem.new()
    return Browser { fs }
    
Browser.start:
    fs.mount()
    browser = start_chrome(DATA_DIRECTORY)
    browser.start_cdp()

Browser.snapshot:
    snapshot = fs.snapshot(DATA_DIRECTORY)
    save_browser(snapshot) // save snapshot ID in database
    return snapshot

Browser.fork:
    return Browser { fs: fs.fork(DATA_DIRECTORY) }
```
Firecrawl is a little more complicated, it’s browser rendering with MapReduce-esque scraping, but at the end of the day, a shared filesystem is exactly what you need to execute the MapReduce algorithm anyway.
```javascript
scrape(fs, url):
    html = fetch(url)
    md = html_to_markdown(html)
    fs.write(url_to_filename(url), md)
    links = find_links(url)
    map(links, (link) => {
        sb = create_sandbox()
        sb.scrape(link) // concurrently scrape and write to shared filesystem
    })
```

btw: I know my pseudocode syntax is inconsistent, but it’s nice to read so I don’t care.

# SQLite as a Service
“one database per agent” is the new (old?) hype. Turso is a very popular example, Cloudflare Durable Objects are also arguably another. How do you branch agent conversations? Just fork their context (the database). How do you share it between agents? Connect all the agents to the same filesystem containing the database.
```javascript
Database.new(path):
    fs = FileSystem.new()
    return Database { fs, path }

// connect from another client
Database.connect(fs, path):
    return Database { fs, path }

Database.open(path):
    fs.mount()
    return sqlite.open(path)

Database.snapshot:
    snapshot = fs.snapshot(path)
    save_database(snapshot, path) 

Database.fork:
    return Database { fs: fs.fork(path) }
```

Yes, it’s really that simple. This has been difficult to do because it’s difficult to do for filesystems, not just SQLite, but there’s nothing particularly special about it.

# Agent Orchestration
Build loops that build loops that build loops, etc, etc. Pretty much every startup is doing this so I won’t even bother listing any. But guess what, giving your agent any sort of memory and then orchestrating it also requires snapshot() and fork() semantics. All those poor agents which are now on-call 24/7 or engineering for a thousand hours continuously need to be able to share a lot information and test a lot of ideas.

A lot of people currently solve this locally with Git worktrees, each subagent can work by itself in a clean environment. Worktrees map directly to filesystem branches, and thus they both automatically get the sharable quality, you can just push the branch and pull it somewhere else. To spawn an agent, create a filesystem. To give it context, read and write to/from the filesystem. To spawn a subagent, fork the filesystem to fork the parent agent’s entire environment.
```javascript
Agent.new(path):
    fs = FileSystem.new()
    return Agent { fs }

Agent.read_context(path):
    fs.mount()
    return fs.read(path)

Agent.write_context(path):
    fs.mount()
    return fs.write(path)

Agent.exec(command)
    sandbox = create_sandbox()
    sandbox.mount(fs)
    sandbox.exec(command)

Agent.snapshot:
    snapshot = fs.snapshot()
    save_agent(snapshot)

Agent.fork:
    return Agent { fs: fs.fork() }

Agent.spawn_subagent(task):
    subagent = fork()
    subagent.prompt(task)
```

This isn’t a traditional linux application, but please humor me and consider the entire agent to be a networked linux service.

# The Template
Am I oversimplifying? Sure, but this isn’t just pseudocode. These are things you can implement today, yourself. Archil provides a fast distributed filesystem fulfilling all the necessary properties: share, snapshot, fork. And of course, in fact, agent-era browsers, SQLite, and agent orchestration layers are possible to build on top of it. You don’t have to hack together a distributed filesystem for your new AI infra startup. Follow the formula:
1. Find a networked linux application that’s useful for agents.
2. Put it in a sandbox.
3. Mount the filesystem in the sandbox wherever the service saves its persistent state.
4. Profit?? You now have an agent-enabled managed service to sell.
