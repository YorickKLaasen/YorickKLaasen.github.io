/* ── TABS ────────────────────────────────────────── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-content');
 
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});
 
/* ── CODE SCRIPTS ────────────────────────────────────────────────────────────
   Nieuw script toevoegen? Voeg een object toe aan deze array met label + code.
   ─────────────────────────────────────────────────────────────────────────── */
const scripts = [
  {
    label: 'EnemySpawner.cs',
    code: `using System.Collections.Generic;
using UnityEngine;
 
internal class EnemySpawner
{
    private readonly Transform[] spawnPoints;
    private readonly Transform player;
 
    public EnemySpawner(Transform[] spawnPoints, Transform player)
    {
        this.spawnPoints = spawnPoints;
        this.player = player;
    }
 
    public void SpawnAll(List<EnemyStats> prefabs, IFlowFieldReader flowfield)
    {
        if (spawnPoints == null || spawnPoints.Length == 0)
        {
            Debug.LogError("Geen spawnpoints toegewezen!");
            return;
        }
 
        foreach (var prefab in prefabs)
        {
            Transform spawnPoint = spawnPoints[Random.Range(0, spawnPoints.Length)];
            var instance = EnemyObjectPool.Instance.GetEnemy(prefab, spawnPoint.position, Quaternion.identity);
 
            if (instance is EnemyController controller)
            {
                controller.Initialize(flowfield, player);
            }
        }
    }
}`
  },
  {
    label: 'EnemyAttack.cs',
    code: `using UnityEngine;
 
public class EnemyAttack : MonoBehaviour, IEnemyAttackBehaviour
{
    [SerializeField] private float damage = 2f;
    [SerializeField] private float attackCooldown = 1f;
 
    private float lastAttackTime = -Mathf.Infinity;
 
    // Trigger wordt geraakt door de player collider
    private void OnTriggerStay2D(Collider2D collision)
    {
        if (Time.time < lastAttackTime + attackCooldown) return;
        lastAttackTime = Time.time;
        OnHit(collision, damage);
    }
 
    public void OnHit(Collider2D collision, float damage)
    {
        if (collision.TryGetComponent<IDamageablePlayer>(out var dmg))
        {
            dmg.TakeDamage(damage);
        }
    }
}`
  },
  {
    label: 'FlowFieldEnemy.cs',
    code: `using UnityEngine;
 
public class FlowFieldEnemy : MonoBehaviour
{
    private IFlowFieldReader flowFieldReader;
    private Transform playerTransform;
    private EnemyStats stats;
 
    private void Awake()
    {
        stats = GetComponent<EnemyStats>();
    }
 
    public void Initialize(IFlowFieldReader flowfield, Transform player)
    {
        flowFieldReader = flowfield;
        playerTransform = player;
    }
 
    private void Update()
    {
        if (flowFieldReader == null) return;
 
        Vector2 dir = flowFieldReader.GetDirectionAt(transform.position);
 
        if (dir == Vector2.zero && playerTransform != null)
        {
            Vector3 toPlayer = playerTransform.position - transform.position;
            dir = new Vector2(toPlayer.x, toPlayer.y).normalized;
        }
 
        Vector3 moveDir = new Vector3(dir.x, dir.y, 0f);
        transform.position += moveDir * stats.enemySpeed * Time.deltaTime;
    }
}`
  },
];
 
/* ── CODE TAB BUILDER ────────────────────────────── */
function buildCodeTab() {
  const tabsRow   = document.getElementById('code-tabs-row');
  const container = document.getElementById('code-panels');
 
  scripts.forEach(({ label, code }, i) => {
    // tab knop
    const btn = document.createElement('button');
    btn.className = 'ctab' + (i === 0 ? ' active' : '');
    btn.textContent = label;
    btn.dataset.index = i;
    tabsRow.appendChild(btn);
 
    // panel
    const panel = document.createElement('div');
    panel.className = 'code-panel';
    panel.id = 'code-panel-' + i;
    panel.style.display = i === 0 ? 'block' : 'none';
    panel.innerHTML = `
      <div class="code-header">
        <span class="code-lang">C# — Unity 6.3</span>
        <button class="copy-btn" data-index="${i}">Kopieer</button>
      </div>
      <pre>${escapeHtml(code)}</pre>`;
    container.appendChild(panel);
  });
 
  // tab klik
  tabsRow.addEventListener('click', e => {
    const btn = e.target.closest('.ctab');
    if (!btn) return;
    tabsRow.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.code-panel').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    document.getElementById('code-panel-' + btn.dataset.index).style.display = 'block';
  });
 
  // kopieer klik
  container.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const pre = document.getElementById('code-panel-' + btn.dataset.index).querySelector('pre');
    navigator.clipboard.writeText(pre.innerText).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Gekopieerd!';
      setTimeout(() => btn.textContent = orig, 1500);
    });
  });
}
 
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
 
buildCodeTab();